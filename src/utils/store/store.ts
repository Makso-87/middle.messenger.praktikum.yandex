import EventBus from '../eventBus/eventBus';
import { set } from '../mydash/set';
import { User } from '../../models/user';
import { Chat } from '../../models/chat';

export enum StoreEvents {
  Updated = 'updated',
}

type Indexed = {
  user?: {
    errors: unknown[],
    data: User | undefined;
    [key: string]: unknown;
  };
  chats?: {
    errors: unknown[],
    data?: {
      list?: Chat[];
      currentChat?: Chat;
    };
    [key: string]: unknown;
  }
  [key: string]: unknown;
};

class Store extends EventBus {
  private _state: Indexed = {};

  public getState = () => this._state;

  public setState = (path: string, value: unknown) => {
    set(this._state, path, value);
    this.emit(StoreEvents.Updated);
  };
}

const store = new Store();

export default store;
