import Block from '../../utils/block/block';
import template from './inputBlock.tmpl';
import './inputBlock.scss';
import { propsType } from '../../utils/block/types';

export class InputBlock extends Block {
  constructor(props: propsType) {
    const newProps = {
      ...props,
      className: `${props.initialClassName ?? 'input-item'} ${props.className ?? ''}`,
    };

    super('div', newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}
