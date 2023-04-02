import Block from '../../utils/block/block';
import { PropsInterface } from '../../utils/block/types';

interface InputProps extends PropsInterface {}

export class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    const newProps = {
      ...props,
      className: `${props.initialClassName ?? 'input-item__input'} ${props.className ?? ''}`,
      attributes: {
        type: 'text',
        ...props.attributes || {},
      },
    };

    super('input', newProps);
  }

  render() {
    return this.compile('', this.props);
  }
}
