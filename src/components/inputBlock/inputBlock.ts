import Block from '../../utils/block/block';
import template from './inputBlock.tmpl';
import './inputBlock.scss';

export class InputBlock extends Block {
  constructor(props) {
    const newProps = {
      ...props,
      className: `input-item ${props.className}`,
    };
    super('div', newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}
