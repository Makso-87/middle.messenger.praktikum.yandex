import Block from '../../../../../../utils/block/block';
import { template } from './message.tmpl';
import { propsType } from '../../../../../../utils/block/types';

export class Message extends Block {
  constructor(props: propsType) {
    const newProps = {
      ...props,
      className: `message ${props.className ?? ''}`,
    };

    super('div', newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}
