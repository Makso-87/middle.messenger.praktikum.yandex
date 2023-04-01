import Block from '../../../../../../utils/block/block';
import { template } from './message.tmpl';

export class Message extends Block {
  constructor(props) {
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
