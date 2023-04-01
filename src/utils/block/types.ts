import EventBus from '../eventBus/eventBus';
import { isArray } from '../mydash/isArray';
import Block from './block';

export type propsType = {
    className?: string;
    initialClassName?: string;
    attributes?: {
        [key: string]: string;
    };
    [key: string]: unknown | unknown[],
};

export type childrenType = {
    [key: string]: Block;
};

export type eventsType = {
    [key: string]: () => void;
};

export interface BlockInterface {
    events: eventsType;
    props: propsType;
    eventBus: () => EventBus;
    dispatchComponentDidMount: () => void;
    compile: (template: string, props: propsType) => HTMLElement;
    getContent: () => HTMLElement;
    children: childrenType;
    setProps: (nextProps: propsType) => void;
    componentDidMount: (oldProps?: propsType) => void;
    removeAttributes: (attributes: string[]) => void;
    removeClassNames: (classNames: string[]) => void;
    componentDidUpdate: (oldProps?: propsType, newProps?: propsType,) => boolean;
    render: () => void;
    show: () => void;
    hide: () => void;
}

export const isBlockInterfaceArray = (element: Block | Block[]): element is Block[] => isArray(element as Block[]);
