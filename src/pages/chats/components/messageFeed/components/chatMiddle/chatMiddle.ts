import Block from '../../../../../../utils/block/block';
import { template } from './chatMiddle.tmpl';

export class ChatMiddle extends Block {
  constructor(props) {
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
