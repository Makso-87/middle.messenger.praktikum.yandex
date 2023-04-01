import template from './avatar.tmpl';
import Block from '../../utils/block/block';
import { propsType } from '../../utils/block/types';

export class Avatar extends Block {
  constructor(props: propsType) {
    const newProps = {
      ...props,
      className: `avatar ${props.className ?? ''}`,
    };

    super('div', newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}
