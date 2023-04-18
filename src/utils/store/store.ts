import EventBus from '../eventBus/eventBus';
import { set } from '../mydash/set';

export enum StoreEvents {
  Updated = 'updated',
}

type Indexed<T = unknown> = {
  [key in string]: T;
};

class Store extends EventBus {
  private _state: Indexed = {};

  public getState = () => this._state;

  public setState = (path: string, value: unknown) => {
    set(this._state, path, value);
    this.emit(StoreEvents.Updated);
    console.log('setState', value);
  };
}

export default new Store();
