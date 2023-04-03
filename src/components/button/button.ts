import template from './button.tmpl';
import Block from '../../utils/block/block';
import { PropsInterface } from '../../utils/block/types';

interface ButtonProps extends PropsInterface {
  link?: string;
  text?: string;
}

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    const newProps = {
      ...props,
      className: `${props.initialClassName ?? 'button'} ${props.className ?? ''}`,
      attributes: {
        ...props.attributes || {},
      },
    };

    super('button', newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}
