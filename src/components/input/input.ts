import Block from '../../utils/block/block';

export class Input extends Block {
  constructor(props) {
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
