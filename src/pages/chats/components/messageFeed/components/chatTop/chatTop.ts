import Block from '../../../../../../utils/block/block';
import { template } from './chatTop.tmpl';
import { propsType } from '../../../../../../utils/block/types';

export class ChatTop extends Block {
  constructor(props: propsType) {
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
