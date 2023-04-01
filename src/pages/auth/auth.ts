import Block from '../../utils/block/block';
import { Form } from '../../components/form';
import { InputBlock } from '../../components/inputBlock';
import { Input } from '../../components/input';
import { formTemplate, template } from './auth.tmpl';
import { Button } from '../../components/button';
import { errorsMessages, validateInput } from '../../utils/validators/validateInput';
import { onSubmitForm } from '../../utils/onSubmitForm/onSubmitForm';
import { propsType } from '../../utils/block/types';
import { ErrorMessage } from '../../components/errorMessage';

export class Auth extends Block {
  constructor(props: propsType) {
    const newProps = {
      ...props,
      className: `auth ${props.className ?? ''}`,
    };

    super('div', newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const loginInput = new Input({
  attributes: {
    id: 'sign-in-login',
    placeholder: 'Логин',
    type: 'text',
    name: 'login',
  },
});

const passwordInput = new Input({
  attributes: {
    id: 'sign-in-password',
    placeholder: 'Пароль',
    type: 'password',
    name: 'password',
  },
});

const loginInputBlock = new InputBlock({
  input: loginInput,
  errorMessage: new ErrorMessage({
    errorText: errorsMessages.login,
  }),
});

const passwordInputBlock = new InputBlock({
  input: passwordInput,
  errorMessage: new ErrorMessage({
    errorText: errorsMessages.password,
  }),
});

loginInput.setProps({
  events: {
    blur: validateInput(loginInputBlock),
    focus: validateInput(loginInputBlock),
  },
});

passwordInput.setProps({
  events: {
    blur: validateInput(passwordInputBlock),
    focus: validateInput(passwordInputBlock),
  },
});

const inputs = [
  loginInputBlock,
  passwordInputBlock,
];

const form = new Form({
  errorMessage: new ErrorMessage({
    errorText: errorsMessages.form,
  }),
  template: formTemplate,
  className: 'form',
  title: 'Вход',
  button: new Button({
    text: 'Войти',
  }),
  formLink: {
    text: 'Зарегистрироваться',
    link: 'registration',
  },

  inputs,
});

form.setProps({
  events: {
    submit: onSubmitForm(form, inputs),
  },
});

export const authData = {
  form,
};
