import Block from '../../utils/block/block';
import { template } from './errorMessage.tmpl';

interface ErrorMessageProps {
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
    super('div', newProps);
  }

  init() {
    this.hide();
  }

  render() {
    return this.compile(template, this.props);
  }
}
