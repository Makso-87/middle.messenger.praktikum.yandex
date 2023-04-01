import template from './chatItem.tmpl';
import Block from '../../../../utils/block/block';
import { propsType } from '../../../../utils/block/types';

export class ChatItem extends Block {
  constructor(props: propsType) {
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
