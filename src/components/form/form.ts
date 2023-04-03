import '../input';
import '../button';
import Block from '../../utils/block/block';
import {
  AttributesType,
  ChildrenType, EventsType, KeyValuePropertyType, PropsInterface,
} from '../../utils/block/types';

type FormPropType = string
  | AttributesType
  | EventsType
  | ChildrenType
  | ChildrenType[]
  | undefined | unknown
  | KeyValuePropertyType
  | PropsInterface;

interface FormProps extends PropsInterface {
  template?: string;
  errorMessage?: ChildrenType | unknown;
  inputs?: ChildrenType[];
  [key: string]: FormPropType;
}

export class Form extends Block<FormProps> {
  constructor(props: FormProps) {
    const newProps = {
      ...props,
      className: `${props.initialClassName ?? 'form'} ${props.className ?? ''}`,
    };

    super('form', newProps);
  }

  render() {
    return this.compile(this.props.template || '', this.props);
  }
}
