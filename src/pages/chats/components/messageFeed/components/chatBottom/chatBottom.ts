import Block from '../../../../../../utils/block/block';
import { template } from './chatBottom.tmpl';

export class ChatBottom extends Block {
  constructor(props) {
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
