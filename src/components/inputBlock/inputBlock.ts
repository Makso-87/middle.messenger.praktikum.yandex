import Block from '../../utils/block/block';
import template from './inputBlock.tmpl';
import './inputBlock.scss';
import { ChildrenType, PropsInterface } from '../../utils/block/types';

interface InputBlockProps extends PropsInterface {
  label?: string;
  input: ChildrenType;
  errorMessage?: ChildrenType | unknown;
}

export class InputBlock extends Block<InputBlockProps> {
  constructor(props: InputBlockProps) {
    const newProps = {
      ...props,
      className: `${props.initialClassName ?? 'input-item'} ${props.className ?? ''}`,
    };

    super('div', newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}
