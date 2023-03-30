import EventBus from '../eventBus/eventBus';
import { isArray } from '../mydash/isArray';

export type propsType = {
    className?: string;
    initialClassName?: string;
    attributes?: {
        [key: string]: string;
    };
    [key: string]: unknown | unknown[],
};

export type childrenType = {
    [key: string]: BlockInterface;
};

export interface BlockInterface {
    _id?: string;
    _element: HTMLElement | null;
    _registerEvents: (arg: EventBus) => void;
    props: propsType;
    eventBus: () => EventBus;
    dispatchComponentDidMount: () => void;
    _createResources: () => void;
    _init: () => void;
    _componentDidMount: () => void;
    _componentDidUpdate: (arg1: propsType, arg2: propsType) => void;
    _render: () => void;
    _addEvents: () => void;
    _removeEvents: () => void;
    _getChildren: (propsAndChildren: propsType) => { props: propsType, children: childrenType };
    _getArrayChildren: (array: BlockInterface[]) => string
    _isChildrenArray: (array: BlockInterface[] | unknown[]) => boolean
    _makePropsProxy: (props: propsType) => propsType;
    _createDocumentElement: (tagName: string) => HTMLElement;
    _setAttributes: () => void;
    _setClasses: () => void;
    compile: (template: string, props: propsType) => HTMLElement;
    getContent: () => HTMLElement;
}

export const isBlockInterfaceArray = (element: BlockInterface | BlockInterface[]): element is BlockInterface[] => isArray(element as BlockInterface[]);
