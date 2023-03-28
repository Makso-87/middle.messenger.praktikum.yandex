import Block from '../../../../utils/block/block';
import template from './errorDescription.tmpl';

export class ErrorDescription extends Block {
  constructor(props) {
    const newProps = {
      ...props,
      className: `error-description ${props.className}`,
    };

    super('div', newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}
