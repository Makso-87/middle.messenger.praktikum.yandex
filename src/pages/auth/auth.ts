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
  alert(value);
};

export const authData = {
  form: new Form({
    template: formTemplate,
    className: 'form',
    title: 'Вход',
    buttonEnter: new Button({
      text: 'Войти',
      link: 'chats',
    }),
    formLink: {
      text: 'Зарегистрироваться',
      link: 'registration',
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
