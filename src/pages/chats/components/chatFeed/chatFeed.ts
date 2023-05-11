import template from './chatFeed.tmpl';
import '../chatItem';
import Block from '../../../../utils/block/block';
import { PropsInterface } from '../../../../utils/block/types';

interface ChatFeedInterface extends PropsInterface {}

export class ChatFeed extends Block<ChatFeedInterface> {
  constructor(props: ChatFeedInterface) {
    const newProps = {
      ...props,
      className: `chat-feed ${props.className ?? ''}`,
    };
    super(newProps, 'div');
  }

  render() {
    return this.compile(template, this.props);
  }
}
