import { EventBusInterface } from './types';

export default class EventBus implements EventBusInterface {
  listeners;

  constructor() {
    this.listeners = {
      'event!': [
        () => {},
        () => {},
      ],
    };
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event, callback) {
    if (event in this.listeners) {
      const newListeners = this.listeners[event].filter((listener) => listener !== callback);
      this.listeners[event] = [...newListeners];
    } else {
      throw new Error(`Error: Нет события: ${event}`);
    }
  }

  emit(event, ...args) {
    if (event in this.listeners) {
      this.listeners[event].forEach((listener) => listener(...args));
    } else {
      throw new Error(`Error: Нет события: ${event}`);
    }
  }
}
