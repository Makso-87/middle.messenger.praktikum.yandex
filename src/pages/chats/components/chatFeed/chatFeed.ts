import template from './chatFeed.tmpl';
import '../chatItem';
import Block from '../../../../utils/block/block';

export class ChatFeed extends Block {
  constructor(props) {
    const newProps = {
      ...props,
      className: `chat-feed ${props.className ?? ''}`,
    };
    super('div', newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}
