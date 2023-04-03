type EventCallback = (...args: unknown[]) => void;

type Listener = {
    [event: string]: EventCallback[];
};
export interface EventBusInterface {
    listeners: Listener;
    on: (event: string, callback: EventCallback) => void;
    off: (event: string, callback: EventCallback) => void | Error;
    emit: (event: string, ...args: unknown[]) => void | Error;
}
