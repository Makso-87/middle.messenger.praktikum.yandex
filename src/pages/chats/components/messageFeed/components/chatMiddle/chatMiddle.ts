import Block from '../../../../../../utils/block/block';
import { template } from './chatMiddle.tmpl';
import { PropsInterface } from '../../../../../../utils/block/types';

interface ChatMiddleProps extends PropsInterface {}

export class ChatMiddle extends Block<ChatMiddleProps> {
  constructor(props: ChatMiddleProps) {
    const newProps = {
      ...props,
      className: `chat-middle ${props.className ?? ''}`,
    };

    super('div', newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}
