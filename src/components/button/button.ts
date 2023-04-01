import template from './button.tmpl';
import Block from '../../utils/block/block';

export class Button extends Block {
  constructor(props) {
    const newProps = {
      ...props,
      className: `${props.initialClassName ?? 'button'} ${props.className ?? ''}`,
      attributes: {
        ...props.attributes || {},
      },
    };

    super('button', newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}
