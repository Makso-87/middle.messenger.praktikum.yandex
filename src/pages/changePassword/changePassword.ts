import Block from '../../utils/block/block';
import { Button } from '../../components/button';
import { InputBlock } from '../../components/inputBlock';
import { Input } from '../../components/input';
import { template, formTemplate } from './changePassword.tmpl';
import { Form } from '../../components/form';
import { errorsMessages, validateInput } from '../../utils/validators/validateInput';
import { onSubmitForm } from '../../utils/onSubmitForm/onSubmitForm';
import { ErrorMessage } from '../../components/errorMessage';
import { PropsInterface } from '../../utils/block/types';
import { NavLink } from '../../components/navLink';
import userController from '../../controllers/UserController';
import { UserPasswordData } from '../../api/UserApi';

interface ChangePasswordProps extends PropsInterface{}

export class ChangePassword extends Block<ChangePasswordProps> {
  constructor(props: ChangePasswordProps) {
    const newProps = {
      ...props,
      className: `profile ${props.className ?? ''}`,
    };

    super(newProps, 'div');
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
  label: 'Текущий пароль',
  input: inputOldPassword,
  errorMessage: new ErrorMessage({
    errorText: errorsMessages.password,
  }),
});

const inputNewPasswordBlock = new InputBlock({
  label: 'Новый пароль',
  input: inputNewPassword,
  errorMessage: new ErrorMessage({
    errorText: errorsMessages.password,
  }),
});

inputOldPassword.setProps({
  events: {
    blur: validateInput(inputOldPasswordBlock),
    focus: validateInput(inputOldPasswordBlock),
  },
});

inputNewPassword.setProps({
  events: {
    blur: validateInput(inputNewPasswordBlock),
    focus: validateInput(inputNewPasswordBlock),
  },
});

const inputs = [
  inputOldPasswordBlock,
  inputNewPasswordBlock,
];

const form = new Form({
  className: 'form_edit-change-password',
  template: formTemplate,
  errorMessage: new ErrorMessage({
    errorText: errorsMessages.form,
  }),
  buttonSave: new Button({
    text: 'Сохранить',
  }),
  buttonCancel: new NavLink({
    text: 'Отменить',
    link: '/profile',
    className: 'button button_type_2',
  }),
  inputs,
});

const controller = (data: UserPasswordData) => {
  userController.updateUserPassword(data);
};

form.setProps({
  events: {
    submit: onSubmitForm(form, inputs, controller),
  },
});

export const changePasswordData = {
  form,
};
