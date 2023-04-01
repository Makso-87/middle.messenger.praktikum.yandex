import Block from '../../utils/block/block';
import { propsType } from '../../utils/block/types';
import { template } from './errorMessage.tmpl';

export class ErrorMessage extends Block {
  constructor(props: propsType) {
    const newProps = {
      ...props,
      className: `${props.initialClassName ?? 'error-message'} ${props.className ?? ''}`,
    };
    super('div', newProps);
  }

  init() {
    this.hide();
  }

  render() {
    return this.compile(template, this.props);
  }
}
