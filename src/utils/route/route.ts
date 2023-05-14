import Block from '../block/block';
import { render } from '../render/render';
import { PropsInterface } from '../block/types';

type propsType = {
  rootQuery: string;
  blockProps: PropsInterface;
};

export type blockClassType = typeof Block;

export class Route {
  private _pathname: string;

  private readonly _blockClass: blockClassType;

  private _block: Block | null;

  private _props: propsType;

  constructor(pathname: string, view: blockClassType, props: propsType) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.unmount();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass(this._props?.blockProps ?? {});

      if (this._block) {
        render(this._props.rootQuery, this._block);
      }
    } else {
      render(this._props.rootQuery, this._block);
    }
  }
}
