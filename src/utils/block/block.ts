import * as handlebars from 'handlebars';
import { v4 as uuid } from 'uuid';
import EventBus from '../eventBus/eventBus';
import {
  AttributesType, ChildrenType, EventsType, isBlockInterfaceArray, PropsInterface,
} from './types';
import { isEqual } from '../mydash/isEqual';

export default class Block<P extends PropsInterface = PropsInterface> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_CWU: 'flow:component-will-unmount',
    FLOW_RENDER: 'flow:render',
  };

  _element: HTMLElement;

  _meta: {
    tagName?: string;
    props?: P;
  };

  settings = {
    withInternalID: false,
  };

  children: ChildrenType;

  events: EventsType;

  eventBus: () => EventBus;

  _id;

  props: P;

  private _hidden: boolean;

  constructor(tagName: string = 'div', propsAndChildren: P) {
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
    const { tagName = '' } = this._meta;
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
    const { attributes: currentAttributes } = this.props;

    if (currentAttributes) {
      const newAttributes = Object.keys(currentAttributes).reduce((acc, key) => {
        if (attributes.includes(key)) {
          return acc;
        }

        return {
          ...acc,
          [key]: currentAttributes[key],
        };
      }, {} as AttributesType);

      // @ts-ignore
      this.setProps({
        attributes: { ...newAttributes },
      });
    }
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
  componentDidMount(oldProps?: P): P | undefined {
    return oldProps;
  }

  dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  componentWillUnmount(oldProps?: P): P | undefined {
    return oldProps;
  }

  dispatchComponentWillUnmount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CWU);
  }

  removeAttributes(attributes: string[]): void {
    this._removeAttributes(attributes);
  }

  removeClassNames(classNames: string[]): void {
    this._removeClassNames(classNames);
  }

  dispatchComponentDidUpdate(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDU);
  }

  private _componentDidUpdate(oldProps: P, newProps: P) {
    this.componentDidUpdate(oldProps, newProps);

    if (!isEqual(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps?: P, newProps?: P): boolean {
    return isEqual(oldProps, newProps);
  }

  setProps = (nextProps: P): void => {
    if (!nextProps) {
      return;
    }

    const oldProps = this.props;

    const { props = {} as P, children = {} } = this._getChildren(nextProps);

    Object.assign(this.props, props);
    Object.assign(this.children, children);

    if (Object.keys(nextProps).filter((key) => key === 'className')) {
      this._setClasses();
    }

    if (Object.keys(nextProps).filter((key) => key === 'attributes')) {
      this._setAttributes();
    }

    this._componentDidUpdate(oldProps, props);
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

  render(): Node {
    return document.createElement('div');
  }

  unmount(): void {
    this.dispatchComponentWillUnmount();
    this._element.remove();
  }

  getContent(): HTMLElement {
    return this.element;
  }

  private _addEvents() {
    const { events = {} as EventsType } = this.props;

    Object.entries(events).forEach(([event, callback]) => {
      this._element.addEventListener(event, callback);
    });
  }

  private _removeEvents() {
    const { events = {} as EventsType } = this.props;

    Object.entries(events).forEach(([event, callback]) => {
      this._element.removeEventListener(event, callback);
    });
  }

  compile(template: string, props: P = {} as P): Node {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]: [string, Block]) => {
      if (child) {
        // @ts-ignore
        propsAndStubs[key] = isBlockInterfaceArray(child) ? this._getArrayChildren(child) : `<div data-id="${child._id}"></div>`;
      }
    });

    const fragment = <HTMLTemplateElement> this._createDocumentElement('template');

    fragment.innerHTML = handlebars.compile(template)(propsAndStubs);

    const childHandler = (child: Block | Block[]) => {
      if (isBlockInterfaceArray(child)) {
        child.forEach(childHandler);
        return;
      }

      const stub = child ? fragment.content.querySelector(`[data-id="${child._id}"]`) : null;

      if (stub) {
        stub.replaceWith(child.getContent());
      }
    };

    Object.values(this.children).forEach(childHandler);
    return fragment.content;
  }

  private _getChildren(propsAndChildren: P) {
    const children: ChildrenType | ChildrenType[] = {} as ChildrenType;
    const props: P = {} as P;
    const childrenKeys = Object.keys(this.children || {});

    Object.entries(propsAndChildren).forEach(([key, value]: [string, Block | Block[]]) => {
      if (value instanceof Block || this._isChildrenArray(value) || childrenKeys.includes(key)) {
        // @ts-ignore
        children[key] = value;
      } else {
        // @ts-ignore
        props[key] = value;
      }
    });

    return { children, props };
  }

  private _getArrayChildren(array: Block[]): string {
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
      set(target: P, prop: string, val) {
        const oldTarget = { ...target };
        // eslint-disable-next-line no-param-reassign
        // @ts-ignore
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

  lockDocument(): void {
    document.body.classList.add('body-lock');
  }

  unlockDocument(): void {
    document.body.classList.remove('body-lock');
  }
}
