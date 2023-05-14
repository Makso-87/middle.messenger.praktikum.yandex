import template from './profileDataItem.tmpl';
import Block from '../../../../utils/block/block';
import { PropsInterface } from '../../../../utils/block/types';

interface ProfileDataItemProps extends PropsInterface {}

export class ProfileDataItem extends Block<ProfileDataItemProps> {
  constructor(props: ProfileDataItemProps) {
    const newProps = {
      ...props,
      className: `profile__data-line-item ${props.className ?? ''}`,
    };

    super(newProps, 'div');
  }

  render() {
    return this.compile(template, this.props);
  }
}
