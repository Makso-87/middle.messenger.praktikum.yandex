import template from './messageFeed.tmpl';
import Block from '../../../../utils/block/block';
import { propsType } from '../../../../utils/block/types';

export class MessageFeed extends Block {
  constructor(props:propsType = {}) {
    const newProps = {
      ...props,
      className: `message-feed ${props.className ?? ''}`,
    };
    super('div', newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}
