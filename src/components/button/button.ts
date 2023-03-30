import template from './button.tmpl';
import Block from '../../utils/block/block';

export class Button extends Block {
  constructor(props) {
    const newProps = {
      ...props,
      className: `${props.initialClassName ?? 'button'} ${props.className ?? ''}`,
      attributes: {
        href: props.link || '#',
        ...props.attributes || {},
      },
    };

    super('a', newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}
