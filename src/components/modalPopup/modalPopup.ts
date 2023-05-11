import Block from '../../utils/block/block';
import { PropsInterface } from '../../utils/block/types';
import { template } from './modalPopup.tmpl';
import { Button } from '../button';

interface ModalPopupProps extends PropsInterface{
    content?: Block | Block[];
    closeButton?: Block;
}

export class ModalPopup extends Block<ModalPopupProps> {
  constructor(props: ModalPopupProps) {
    const newProps = {
      ...props,
      className: `${props.initialClassName ?? 'modal-popup'} ${props.className ?? ''}`,
    };

    super(newProps, 'div');
  }

  closeModal(event: Event) {
    event.preventDefault();
    this.hide();
    this.unlockDocument();
  }

  init() {
    const closeButton = new Button({
      text: '',
      initialClassName: 'modal-close-button',
      events: {
        click: this.closeModal.bind(this),
      },
    });

    this.setProps({
      closeButton,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
