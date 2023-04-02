import Block from '../../../../utils/block/block';
import template from './errorDescription.tmpl';
import { PropsInterface } from '../../../../utils/block/types';

interface ErrorDescriptionProps extends PropsInterface {}

export class ErrorDescription extends Block<ErrorDescriptionProps> {
  constructor(props: ErrorDescriptionProps) {
    const newProps = {
      ...props,
      className: `error-description ${props.className ?? ''}`,
    };

    super('div', newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}
