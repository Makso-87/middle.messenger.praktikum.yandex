import template from './messageFeed.tmpl';
import Block from '../../../../utils/block/block';
import { PropsInterface } from '../../../../utils/block/types';

interface MessageFeedProps extends PropsInterface {}

export class MessageFeed extends Block<MessageFeedProps> {
  constructor(props:MessageFeedProps = {}) {
    const newProps = {
      ...props,
      className: `message-feed ${props.className ?? ''}`,
    };

    super(newProps, 'div');
  }

  render() {
    return this.compile(template, this.props);
  }
}
