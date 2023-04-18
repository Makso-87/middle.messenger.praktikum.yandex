import template from './avatar.tmpl';
import Block from '../../utils/block/block';
import { ChildrenType, PropsInterface } from '../../utils/block/types';

interface AvatarProps extends PropsInterface{
  url: string;
  input?: ChildrenType;
  inputId?: string;
}

export class Avatar extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    const newProps = {
      ...props,
      className: `${props.initialClassName ?? 'avatar'} ${props.className ?? ''}`,
    };

    super('div', newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}
