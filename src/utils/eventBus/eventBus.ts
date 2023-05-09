import { EventBusInterface } from './types';

export default class EventBus implements EventBusInterface {
  listeners: {
    [key: string]: ((...args: unknown[]) => void)[];
  };

  constructor() {
    this.listeners = {
      'event!': [
        () => {},
        () => {},
      ],
    };
  }

  on(event: string, callback: () => unknown) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event:string, callback: () => unknown) {
    if (event in this.listeners) {
      const newListeners = this.listeners[event].filter((listener) => listener !== callback);
      this.listeners[event] = [...newListeners];
    } else {
      throw new Error(`Error: Нет события: ${event}`);
    }
  }

  emit(event: string, ...args: unknown[]) {
    if (event in this.listeners) {
      this.listeners[event].forEach((listener) => listener(...args));
    } else {
      throw new Error(`Error: Нет события: ${event}`);
    }
  }
}
