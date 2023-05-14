import Block from '../../utils/block/block';
import { template } from './errorMessage.tmpl';
import { PropsInterface } from '../../utils/block/types';

interface ErrorMessageProps extends PropsInterface {
  errorText: string;
  initialClassName?: string;
  className?: string;
}

export class ErrorMessage extends Block<ErrorMessageProps> {
  constructor(props: ErrorMessageProps) {
    const newProps = {
      ...props,
      className: `${props.initialClassName ?? 'error-message'} ${props.className ?? ''}`,
    };
    super(newProps, 'div');
  }

  init() {
    this.hide();
  }

  render() {
    return this.compile(template, this.props);
  }
}
