import template from './avatar.tmpl';
import Block from '../../utils/block/block';
import { ChildrenType, PropsInterface } from '../../utils/block/types';

interface AvatarProps extends PropsInterface{
  url?: string | null | undefined;
  input?: ChildrenType;
  inputId?: string;
}

export class Avatar extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    const newProps = {
      ...props,
      className: `${props.initialClassName ?? 'avatar'} ${props.className ?? ''}`,
    };

    super(newProps, 'div');
  }

  render() {
    return this.compile(template, this.props);
  }
}
