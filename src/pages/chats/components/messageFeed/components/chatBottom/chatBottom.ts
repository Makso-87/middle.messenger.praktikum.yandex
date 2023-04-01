import Block from '../../../../../../utils/block/block';
import { template } from './chatBottom.tmpl';
import { propsType } from '../../../../../../utils/block/types';

export class ChatBottom extends Block {
  constructor(props: propsType) {
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
