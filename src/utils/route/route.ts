import Block from '../block/block';
import { render } from '../render/render';

export class Route<P extends Record<string, unknown> = unknown> {
  _pathname: string;

  _blockClass: InstanceType<unknown>;

  _block: Block | null;

  _props: P;

  constructor(pathname: string, view: Block, props: P) {
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
