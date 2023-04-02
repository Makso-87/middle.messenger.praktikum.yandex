import Block from '../../../../../../utils/block/block';
import { template } from './chatTop.tmpl';
import { PropsInterface } from '../../../../../../utils/block/types';

interface ChatTopProps extends PropsInterface {}

export class ChatTop extends Block<ChatTopProps> {
  constructor(props: ChatTopProps) {
    const newProps = {
      ...props,
      className: `chat-top ${props.className ?? ''}`,
    };

    super('div', newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}
