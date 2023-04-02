import Block from '../../../../../../utils/block/block';
import { template } from './chatBottom.tmpl';
import { PropsInterface } from '../../../../../../utils/block/types';

interface ChatBottomProps extends PropsInterface{}

export class ChatBottom extends Block<ChatBottomProps> {
  constructor(props: ChatBottomProps) {
    const newProps = {
      ...props,
      className: `chat-bottom ${props.className ?? ''}`,
    };

    super('div', newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}
