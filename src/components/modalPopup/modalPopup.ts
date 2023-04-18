import Block from '../../utils/block/block';
import { PropsInterface } from '../../utils/block/types';
import { template } from './modalPopup.tmpl';

interface ModalPopupProps extends PropsInterface{
    content: Block | Block[];
}

export class ModalPopup extends Block<ModalPopupProps> {
  constructor(props: ModalPopupProps) {
    const newProps = {
      ...props,
      className: `${props.initialClassName ?? 'modal-popup'} ${props.className ?? ''}`,
    };

    super('div', newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}
