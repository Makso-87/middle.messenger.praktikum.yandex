import { isArray } from '../mydash/isArray';
import Block from './block';

export type AttributesType = {
    name?: string;
    [key: string]: string | unknown;
}

export type ChildrenType = { [key: string]: Block | Block[] };

export type EventsType = {
    [key: string]:
        | ((event: FormDataEvent) => void)
        | ((event: InputEvent) => void)
        | Promise<void>
        | ((...args: unknown[]) => (event: InputEvent) => void);
};

export type KeyValuePropertyType = {
    [key: string]: string;
}

export interface PropsInterface {
    className?: string;
    events?: EventsType;
    initialClassName?: string;
    attributes?: AttributesType;
    [key: string]: Block | unknown;
}

export const isBlockInterfaceArray = (element: Block | (Block | Block[])[]): element is Block[] => isArray(element as Block[]);
