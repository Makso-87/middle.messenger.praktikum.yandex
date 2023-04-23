import EventBus from '../eventBus/eventBus';
import { set } from '../mydash/set';
import { User } from '../../models/user';

export enum StoreEvents {
  Updated = 'updated',
}

type Indexed<T = unknown> = {
  [key: string]: T;
  user?: {
    data: User | undefined;
    [key: string]: T;
  };
};

class Store extends EventBus {
  private _state: Indexed = {};

  public getState = () => this._state;

  public setState = (path: string, value: unknown) => {
    set(this._state, path, value);
    this.emit(StoreEvents.Updated);
  };
}

export default new Store();
