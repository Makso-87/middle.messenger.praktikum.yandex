import Block from '../../utils/block/block';
import { Form } from '../../components/form';
import { InputBlock } from '../../components/inputBlock';
import { Input } from '../../components/input';
import { formTemplate, template } from './auth.tmpl';
import { Button } from '../../components/button';
import { errorsMessages, validateInput } from '../../utils/validators/validateInput';
import { onSubmitForm } from '../../utils/onSubmitForm/onSubmitForm';
import { ErrorMessage } from '../../components/errorMessage';
import { PropsInterface } from '../../utils/block/types';
import { NavLink } from '../../components/navLink';
import authController from '../../controllers/AuthController';

interface AuthProps extends PropsInterface{}

export class Auth extends Block<AuthProps> {
  constructor(props: AuthProps) {
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

const loginInput: Block = new Input({
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
  formLink: new NavLink({
    className: 'form__link',
    text: 'Зарегистрироваться',
    link: '/sign-up',
  }),

  inputs,
});

const controller = (data: unknown) => {
  authController.signin(data);
};

form.setProps({
  events: {
    submit: onSubmitForm(form, inputs, controller),
  },
});

export const authData = {
  form,
};
