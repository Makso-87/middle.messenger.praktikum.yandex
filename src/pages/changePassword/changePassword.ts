import Block from '../../utils/block/block';
import { Button } from '../../components/button';
import { InputBlock } from '../../components/inputBlock';
import { Input } from '../../components/input';
import { template, formTemplate } from './changePassword.tmpl';
import { Form } from '../../components/form';
import { Link } from '../../components/link';
import { errorsMessages, validateInput } from '../../utils/validators/validateInput';
import { onSubmitForm } from '../../utils/onSubmitForm/onSubmitForm';

export class ChangePassword extends Block {
  constructor(props) {
    const newProps = {
      ...props,
      className: `profile ${props.className ?? ''}`,
    };

    super('div', newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const inputOldPassword = new Input(
  {
    attributes: {
      type: 'password',
      label: 'Текущий пароль',
      name: 'oldPassword',
      id: 'old-password',
      placeholder: 'Текущий пароль',
    },
  },
);

const inputNewPassword = new Input(
  {
    attributes: {
      type: 'password',
      label: 'Новый пароль',
      name: 'newPassword',
      id: 'new-password',
      placeholder: 'Новый пароль',
    },
  },
);

const inputOldPasswordBlock = new InputBlock({
  errorText: errorsMessages.password,
  label: 'Текущий пароль',
  input: inputOldPassword,
});

const inputNewPasswordBlock = new InputBlock({
  errorText: errorsMessages.password,
  label: 'Новый пароль',
  input: inputNewPassword,
});

inputOldPassword.setProps({
  events: {
    blur: validateInput(inputOldPasswordBlock),
  },
});

inputNewPassword.setProps({
  events: {
    blur: validateInput(inputNewPasswordBlock),
  },
});

const inputs = [
  inputOldPasswordBlock,
  inputNewPasswordBlock,
];

const form = new Form({
  className: 'form_edit-change-password',
  template: formTemplate,
  buttonSave: new Button({
    text: 'Сохранить',
    link: 'chats',
  }),
  buttonCancel: new Link({
    text: 'Отменить',
    link: 'chats',
    className: 'button button_type_2',
  }),
  inputs,
});

form.setProps({
  events: {
    submit: onSubmitForm(form, inputs),
  },
});

export const changePasswordData = {
  form,
};
