import Block from '../../utils/block/block';
import { Form } from '../../components/form';
import { InputBlock } from '../../components/inputBlock';
import { Input } from '../../components/input';
import { formTemplate, template } from './auth.tmpl';
import { Button } from '../../components/button';

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

const onLoginInput = (event) => {
  const { value } = event.target;
};

const onSubmitForm = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = {
    login: formData.get('login'),
    password: formData.get('password'),
  };
  console.log(data);
};

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
      new InputBlock({
        input: new Input({
          attributes: {
            id: 'sign-in-login',
            placeholder: 'Логин',
            type: 'text',
            name: 'login',
          },
          events: {
            blur: onLoginInput,
          },
        }),
      }),
      new InputBlock({
        input: new Input({
          attributes: {
            id: 'sign-in-password',
            placeholder: 'Пароль',
            type: 'password',
            name: 'password',
          },
        }),
      }),
    ],
  }),
};
