import Block from '../../utils/block/block';
import template from './inputBlock.tmpl';
import './inputBlock.scss';
import { PropsInterface } from '../../utils/block/types';

interface InputBlockProps extends PropsInterface {
  label?: string;
  input: Block;
  errorMessage?: Block | unknown;
}

export class InputBlock extends Block<InputBlockProps> {
  constructor(props: InputBlockProps) {
    const newProps = {
      ...props,
      className: `${props.initialClassName ?? 'input-item'} ${props.className ?? ''}`,
    };

    super(newProps, 'div');
  }

  render() {
    return this.compile(template, this.props);
  }
}
