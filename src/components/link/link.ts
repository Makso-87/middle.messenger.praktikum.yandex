import template from './link.tmpl';
import Block from '../../utils/block/block';

export class Link extends Block {
  constructor(props) {
    const newProps = {
      ...props,
      className: `${props.initialClassName ?? 'link'} ${props.className ?? ''}`,
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
