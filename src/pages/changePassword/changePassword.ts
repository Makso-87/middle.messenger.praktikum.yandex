import Block from '../../utils/block/block';
import { Button } from '../../components/button';
import { InputBlock } from '../../components/inputBlock';
import { Input } from '../../components/input';
import { template, formTemplate } from './changePassword.tmpl';
import { Form } from '../../components/form';

export class ChangePassword extends Block {
  constructor(props) {
    const newProps = {
      ...props,
      className: `profile ${props.className}`,
    };

    super('div', newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const changePasswordData = {
  form: new Form({
    className: 'form_edit-change-password',
    template: formTemplate,
    buttonSave: new Button({
      text: 'Сохранить',
      link: 'chats',
    }),
    buttonCancel: new Button({
      text: 'Отменить',
      link: 'chats',
      className: 'button_type_2',
    }),
    inputs: [
      new InputBlock({
        label: 'Текущий пароль',
        input: new Input(
          {
            attributes: {
              type: 'password',
              label: 'Текущий пароль',
              name: 'oldPassword',
              id: 'old-password',
              placeholder: 'Текущий пароль',
            },
          },
        ),
      }),
      new InputBlock({
        label: 'Новый пароль',
        input: new Input(
          {
            attributes: {
              type: 'password',
              label: 'Новый пароль',
              name: 'newPassword',
              id: 'new-password',
              placeholder: 'Новый пароль',
            },
          },
        ),
      }),
    ],
  }),
};
