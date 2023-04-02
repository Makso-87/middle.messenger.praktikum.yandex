import Block from '../../utils/block/block';
import { Form } from '../../components/form';
import { Input } from '../../components/input';
import { formTemplate, template } from './registration.tmpl';
import { InputBlock } from '../../components/inputBlock';
import { Button } from '../../components/button';
import { errorsMessages, validateInput } from '../../utils/validators/validateInput';
import { onSubmitForm } from '../../utils/onSubmitForm/onSubmitForm';
import { PropsInterface } from '../../utils/block/types';
import { ErrorMessage } from '../../components/errorMessage';

interface RegistrationProps extends PropsInterface {}

export class Registration extends Block<RegistrationProps> {
  constructor(props: RegistrationProps) {
    const newProps = {
      ...props,
      className: `registration ${props.className ?? ''}`,
    };
    super('div', newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const inputEmail = new Input({
  attributes: {
    type: 'email',
    name: 'email',
    id: 'sign-up-email',
    placeholder: 'Почта',
  },
});

const inputLogin = new Input({
  attributes: {
    type: 'text',
    name: 'login',
    id: 'sign-up-login',
    placeholder: 'Логин',
  },
});

const inputFirstName = new Input({
  attributes: {
    type: 'text',
    name: 'first_name',
    id: 'sign-up-first-name',
    placeholder: 'Имя',
  },
});

const inputSecondName = new Input({
  attributes: {
    type: 'text',
    name: 'second_name',
    id: 'sign-up-last-name',
    placeholder: 'Фамилия',
  },
});

const inputPhone = new Input({
  attributes: {
    type: 'text',
    name: 'phone',
    id: 'sign-up-phone',
    placeholder: 'Телефон',
  },
});

const inputPassword = new Input({
  attributes: {
    type: 'password',
    name: 'oldPassword',
    id: 'sign-up-password',
    placeholder: 'Пароль',
  },
});

const inputPasswordCheck = new Input({
  attributes: {
    type: 'password',
    name: 'newPassword',
    id: 'sign-up-password-check',
    placeholder: 'Повторите пароль',
  },
});

const inputEmailBlock = new InputBlock({
  input: inputEmail,
  errorMessage: new ErrorMessage({
    errorText: errorsMessages.email,
  }),
});

const inputLoginBlock = new InputBlock({
  input: inputLogin,
  errorMessage: new ErrorMessage({
    errorText: errorsMessages.login,
  }),
});

const inputFirstNameBlock = new InputBlock({
  input: inputFirstName,
  errorMessage: new ErrorMessage({
    errorText: errorsMessages.first_name,
  }),
});

const inputSecondNameBlock = new InputBlock({
  input: inputSecondName,
  errorMessage: new ErrorMessage({
    errorText: errorsMessages.second_name,
  }),
});

const inputPhoneBlock = new InputBlock({
  input: inputPhone,
  errorMessage: new ErrorMessage({
    errorText: errorsMessages.phone,
  }),
});

const inputPasswordBlock = new InputBlock({
  input: inputPassword,
  errorMessage: new ErrorMessage({
    errorText: errorsMessages.password,
  }),
});

const inputPasswordCheckBlock = new InputBlock({
  input: inputPasswordCheck,
  errorMessage: new ErrorMessage({
    errorText: errorsMessages.password,
  }),
});

inputEmail.setProps({
  events: {
    blur: validateInput(inputEmailBlock),
    focus: validateInput(inputEmailBlock),
  },
});

inputLogin.setProps({
  events: {
    blur: validateInput(inputLoginBlock),
    focus: validateInput(inputLoginBlock),
  },
});

inputFirstName.setProps({
  events: {
    blur: validateInput(inputFirstNameBlock),
    focus: validateInput(inputFirstNameBlock),
  },
});

inputSecondName.setProps({
  events: {
    blur: validateInput(inputSecondNameBlock),
    focus: validateInput(inputSecondNameBlock),
  },
});

inputPhone.setProps({
  events: {
    blur: validateInput(inputPhoneBlock),
    focus: validateInput(inputPhoneBlock),
  },
});

inputPassword.setProps({
  events: {
    blur: validateInput(inputPasswordBlock),
    focus: validateInput(inputPasswordBlock),
  },
});

inputPasswordCheck.setProps({
  events: {
    blur: validateInput(inputPasswordCheckBlock),
    focus: validateInput(inputPasswordCheckBlock),
  },
});

const inputs = [
  inputEmailBlock,
  inputLoginBlock,
  inputFirstNameBlock,
  inputSecondNameBlock,
  inputPhoneBlock,
  inputPasswordBlock,
  inputPasswordCheckBlock,
];

const form = new Form({
  template: formTemplate,
  errorMessage: new ErrorMessage({
    errorText: errorsMessages.form,
  }),
  title: 'Регистрация',
  button: new Button({
    text: 'Зарегистрироваться',
    link: '/',
  }),
  formLink: {
    text: 'Войти',
    link: '/',
  },
  inputs,
});

form.setProps({
  events: {
    submit: onSubmitForm(form, inputs),
  },
});

export const registrationData = {
  form,
};
