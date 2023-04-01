import Block from '../../../../utils/block/block';
import template from './errorDescription.tmpl';
import { propsType } from '../../../../utils/block/types';

export class ErrorDescription extends Block {
  constructor(props: propsType) {
    const newProps = {
      ...props,
      className: `error-description ${props.className ?? ''}`,
    };

    super('div', newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}
