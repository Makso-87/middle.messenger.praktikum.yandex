import Block from '../../utils/block/block';
import { PropsInterface } from '../../utils/block/types';
import { template } from './customComponent.tmpl';

interface CustomComponentProps extends PropsInterface {
    content?: Block | Block[];
    tagName?: string;
    text?: string;
    template?: string;
}

export class CustomComponent extends Block<CustomComponentProps> {
  constructor(props: CustomComponentProps) {
    const newProps = {
      ...props,
      className: `${props.initialClassName ?? 'custom'} ${props.className ?? ''}`,
    };

    super(props.tagName ?? 'div', newProps);
  }

  render() {
    return this.compile(this.props.template ?? template, this.props);
  }
}
