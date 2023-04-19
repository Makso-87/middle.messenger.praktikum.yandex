import * as handlebars from 'handlebars';
import { v4 as uuid } from 'uuid';
import EventBus from '../eventBus/eventBus';
import {
  AttributesType, ChildrenType, EventsType, isBlockInterfaceArray, PropsInterface,
} from './types';

export default abstract class Block<P extends Record<string, any> = PropsInterface> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_CWU: 'flow:component-will-unmount',
    FLOW_RENDER: 'flow:render',
  };

  _element: HTMLElement;

  _meta;

  settings = {
    withInternalID: false,
  };

  children: ChildrenType;

  events: EventsType;

  eventBus: () => EventBus;

  _id;

  props: P;

  private _hidden: boolean;

  constructor(tagName: string = 'div', propsAndChildren: P = {}) {
    const { props, children = {} } = this._getChildren(propsAndChildren);
    const eventBus: EventBus = new EventBus();

    this._meta = {
      tagName,
      props,
    };

    this._id = uuid();

    this.children = children;

    this.props = this._makePropsProxy({ ...props, __id: this._id });

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  private _init() {
    this._createResources();
    this._setAttributes();
    this._setClasses();
    this.init();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  init() {}

  private _componentDidMount() {
    this.componentDidMount();

    const childrenValues: Block[] = Object.values(this.children);

    const dispatchChildren = (children: Block | Block[]) => {
      if (isBlockInterfaceArray(children)) {
        children.forEach((child: Block | Block[]) => {
          dispatchChildren(child);
        });
      } else {
        children.dispatchComponentDidMount();
      }
    };

    dispatchChildren(childrenValues);
  }

  private _componentWillUnmount() {
    this.componentWillUnmount();
  }

  private _setAttributes() {
    Object.entries(this.props.attributes || {}).forEach(([name, value]: [name: string, value: string]) => {
      this._element.setAttribute(name, value);
    });
  }

  private _removeAttributes(attributes: string[]): void {
    attributes.forEach((attribute) => this._element.removeAttribute(attribute));
    const { attributes: currentAttributes }: { attributes: AttributesType} = this.props;

    const newAttributes = Object.keys(currentAttributes).reduce((acc, key) => {
      if (attributes.includes(key)) {
        return acc;
      }

      return {
        ...acc,
        [key]: currentAttributes[key],
      };
    }, {});

    this.setProps({
      attributes: { ...newAttributes },
    });
  }

  private _removeClassNames(classNames: string[]) {
    this._element.classList.remove(...classNames);
    const { className = '' } = this.props;
    const newClasses = className.split(' ').filter((name: string) => !classNames.includes(name)).join(' ');

    this.setProps({
      className: newClasses,
    });
  }

  private _setClasses() {
    const { className = '' } = this.props;

    if (className.length) {
      className.trim().split(' ').forEach((classNameItem: string) => {
        this._element.classList.add(classNameItem);
      });
    }
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount(oldProps?: P): void {}

  dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  componentWillUnmount(oldProps?: P): void {}

  dispatchComponentWillUnmount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CWU);
  }

  removeAttributes(attributes: string[]): void {
    this._removeAttributes(attributes);
  }

  removeClassNames(classNames: string[]): void {
    this._removeClassNames(classNames);
  }

  private _componentDidUpdate(oldProps: P, newProps: P) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps?: P, newProps?: P): boolean {
    return true;
  }

  setProps = (nextProps: P): void => {
    if (!nextProps) {
      return;
    }

    const { props = {}, children = {} } = this._getChildren(nextProps);

    Object.assign(this.props, props);
    Object.assign(this.children, children);

    if (Object.keys(nextProps).filter((key) => key === 'className')) {
      this._setClasses();
    }

    if (Object.keys(nextProps).filter((key) => key === 'attributes')) {
      this._setAttributes();
    }

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const block = this.render();
    this._removeEvents();
    this._element.innerHTML = '';
    this._element.appendChild(block);
    this._addEvents();
  }

  // Может переопределять пользователь, необязательно трогать
  render(): Node {}

  unmount(): void {
    this.dispatchComponentWillUnmount();
    this._element.remove();
  }

  getContent(): HTMLElement {
    return this.element;
  }

  private _addEvents() {
    const { events = {} }: { events: EventsType} = this.props;

    Object.entries(events).forEach(([event, callback]) => {
      this._element.addEventListener(event, callback);
    });
  }

  private _removeEvents() {
    const { events = {} }: { events: EventsType} = this.props;

    Object.entries(events).forEach(([event, callback]) => {
      this._element.removeEventListener(event, callback);
    });
  }

  compile(template: string, props: P = {}): Node {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]: [string, Block]) => {
      propsAndStubs[key] = isBlockInterfaceArray(child) ? this._getArrayChildren(child) : `<div data-id="${child._id}"></div>`;
    });

    const fragment = this._createDocumentElement('template');

    fragment.innerHTML = handlebars.compile(template)(propsAndStubs);

    const childHandler = (child: Block | Block[]) => {
      if (isBlockInterfaceArray(child)) {
        child.forEach(childHandler);
        return;
      }

      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

      stub.replaceWith(child.getContent());
    };

    Object.values(this.children).forEach(childHandler);

    return fragment.content;
  }

  private _getChildren(propsAndChildren: P) {
    const children: ChildrenType | ChildrenType[] = {};
    const props: P = {};

    Object.entries(propsAndChildren).forEach(([key, value]: [string, Block | Block[]]) => {
      if (value instanceof Block || this._isChildrenArray(value)) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  private _getArrayChildren(array: Block[]) {
    return array.map((child) => `
      <div data-id="${child._id}"></div>`).reduce((acc: string, item: string) => `${acc}${item}
    `, '');
  }

  private _isChildrenArray(array: Block[] | unknown = []) {
    if (!Array.isArray(array)) {
      return false;
    }

    let isBlock = false;

    array.forEach((item) => {
      isBlock = item instanceof Block;
    });

    return isBlock;
  }

  private _makePropsProxy(props: P) {
    const self = this;

    return new Proxy(props, {
      set(target: P, prop:string, val) {
        const oldTarget = { ...target };
        // eslint-disable-next-line no-param-reassign
        target[prop] = val;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  private _createDocumentElement(tagName: string) {
    // eslint-disable-next-line no-undef
    const element: HTMLElement = document.createElement(tagName);

    if (this.settings.withInternalID) {
      element.setAttribute('data-id', this._id);
    }

    return element;
  }

  getHiddenValue(): boolean {
    return this._hidden;
  }

  show(display: string = 'block'): void {
    this.getContent().style.display = display;
    this._hidden = false;
  }

  hide(): void {
    this.getContent().style.display = 'none';
    this._hidden = true;
  }
}
