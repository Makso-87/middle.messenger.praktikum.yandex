import template from './profileDataItem.tmpl';
import Block from '../../../../utils/block/block';
import { propsType } from '../../../../utils/block/types';

export class ProfileDataItem extends Block {
  constructor(props: propsType) {
    const newProps = {
      ...props,
      className: `profile__data-line-item ${props.className ?? ''}`,
    };

    super('div', newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}
