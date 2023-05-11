import Block from '../../../../../../utils/block/block';
import { template } from './message.tmpl';
import { PropsInterface } from '../../../../../../utils/block/types';

interface MessageProps extends PropsInterface {}

export class Message extends Block<MessageProps> {
  constructor(props: MessageProps) {
    const newProps = {
      ...props,
      className: `message ${props.className ?? ''}`,
    };

    super(newProps, 'div');
  }

  render() {
    return this.compile(template, this.props);
  }
}
