import '../input';
import '../button';
import Block from '../../utils/block/block';

export class Form extends Block {
  constructor(props) {
    const newProps = {
      ...props,
      className: `${props.initialClassName ?? 'form'} ${props.className ?? ''}`,
    };

    super('form', newProps);
  }

  render() {
    return this.compile(this.props.template || '', this.props);
  }
}
