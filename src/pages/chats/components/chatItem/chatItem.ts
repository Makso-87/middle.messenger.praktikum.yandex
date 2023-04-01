import template from './chatItem.tmpl';
import Block from '../../../../utils/block/block';

export class ChatItem extends Block {
  constructor(props) {
    const newProps = {
      ...props,
      className: `chat-item ${props.className ?? ''}`,
    };
    super('li', newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}
