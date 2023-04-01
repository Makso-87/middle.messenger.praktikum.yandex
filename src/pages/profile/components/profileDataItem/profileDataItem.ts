import template from './profileDataItem.tmpl';
import Block from '../../../../utils/block/block';

export class ProfileDataItem extends Block {
  constructor(props) {
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
