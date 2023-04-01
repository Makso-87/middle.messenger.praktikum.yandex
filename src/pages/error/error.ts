import template from './error.tmpl';
import Block from '../../utils/block/block';

export class Error extends Block {
  constructor(props) {
    const newProps = {
      ...props,
      className: `error-page ${props.className ?? ''}`,
    };

    super('div', newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}
