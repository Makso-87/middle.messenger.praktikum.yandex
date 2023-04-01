import Block from '../../../../../../utils/block/block';
import { template } from './chatMiddle.tmpl';
import { propsType } from '../../../../../../utils/block/types';

export class ChatMiddle extends Block {
  constructor(props: propsType) {
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
