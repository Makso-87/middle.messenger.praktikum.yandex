import template from './chatItem.tmpl';
import Block from '../../../../utils/block/block';
import { PropsInterface } from '../../../../utils/block/types';

interface ChatItemProps extends PropsInterface {}

export class ChatItem extends Block<ChatItemProps> {
  constructor(props: ChatItemProps) {
    const newProps = {
      ...props,
      className: `chat-item ${props.className ?? ''}`,
    };
    super(newProps, 'li');
  }

  render() {
    return this.compile(template, this.props);
  }
}
