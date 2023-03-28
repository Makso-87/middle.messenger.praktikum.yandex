import template from './avatar.tmpl';
import Block from '../../utils/block/block';

export class Avatar extends Block {
  constructor(props) {
    const newProps = {
      ...props,
      className: `avatar ${props.className}`,
    };

    super('div', newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}
