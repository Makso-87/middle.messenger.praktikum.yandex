import template from './link.tmpl';
import Block from '../../utils/block/block';
import { propsType } from '../../utils/block/types';

export class Link extends Block {
  constructor(props: propsType) {
    const newProps: propsType = {
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
