import template from './error.tmpl';
import Block from '../../utils/block/block';
import { PropsInterface } from '../../utils/block/types';

interface ErrorProps extends PropsInterface {}

export class Error extends Block<ErrorProps> {
  constructor(props: ErrorProps) {
    const newProps = {
      ...props,
      className: `error-page ${props.className ?? ''}`,
    };

    super(newProps, 'div');
  }

  render() {
    return this.compile(template, this.props);
  }
}
