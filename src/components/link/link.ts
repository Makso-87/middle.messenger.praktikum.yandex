import template from './link.tmpl';
import Block from '../../utils/block/block';
import { PropsInterface } from '../../utils/block/types';

export interface LinkProps extends PropsInterface{
  link?: string
  text?: string;
}

export class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
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
