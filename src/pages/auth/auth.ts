import Block from '../../utils/block/block';
import { Form } from '../../components/form';
import { InputBlock } from '../../components/inputBlock';
import { Input } from '../../components/input';
import { formTemplate, template } from './auth.tmpl';
import { Button } from '../../components/button';
import { errorsMessages, validateInput } from '../../utils/validators/validateInput';

export class Auth extends Block {
  constructor(props) {
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

const onSubmitForm = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = {
    login: formData.get('login'),
    password: formData.get('password'),
  };

  // eslint-disable-next-line no-console
  console.log(data);
};

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
  errorText: errorsMessages.login,
  input: loginInput,
});

const passwordInputBlock = new InputBlock({
  input: passwordInput,
  errorText: errorsMessages.password,
});

loginInput.setProps({
  events: {
    blur: validateInput(loginInputBlock),
  },
});

passwordInput.setProps({
  events: {
    blur: validateInput(passwordInputBlock),
  },
});

export const authData = {
  form: new Form({
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
    events: {
      submit: onSubmitForm,
    },
    inputs: [
      loginInputBlock,
      passwordInputBlock,
    ],
  }),
};
