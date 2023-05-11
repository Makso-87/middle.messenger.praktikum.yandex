import Block from '../../utils/block/block';
import { PropsInterface } from '../../utils/block/types';
import { template } from './popupMenu.tmpl';

interface PopupMenuProps extends PropsInterface {
    items?: Block[];
}

export class PopupMenu extends Block<PopupMenuProps> {
  constructor(props: PopupMenuProps) {
    const newProps = {
      ...props,
      className: `${props.initialClassName ?? 'popup-menu'} ${props.className ?? ''}`,
    };

    super(newProps, 'ul');
  }

  render() {
    return this.compile(template, this.props);
  }
}
