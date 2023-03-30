import Block from '../../utils/block/block';
import { Form } from '../../components/form';
import { Input } from '../../components/input';
import { formTemplate, template } from './registration.tmpl';
import { InputBlock } from '../../components/inputBlock';
import { Button } from '../../components/button';

export class Registration extends Block {
  constructor(props) {
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

const onSubmitForm = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = {
    login: formData.get('login'),
    email: formData.get('email'),
    first_name: formData.get('first_name'),
    second_name: formData.get('second_name'),
    phone: formData.get('phone'),
    password: formData.get('password'),
    password_check: formData.get('password_check'),
  };
  console.log(data);
};

export const registrationData = {
  form: new Form({
    template: formTemplate,
    title: 'Регистрация',
    button: new Button({
      text: 'Зарегистрироваться',
      link: '/',
    }),
    formLink: {
      text: 'Войти',
      link: '/',
    },
    events: {
      submit: onSubmitForm,
    },
    inputs: [
      new InputBlock({
        input: new Input({
          attributes: {
            type: 'email',
            name: 'email',
            id: 'sign-up-email',
            placeholder: 'Почта',
          },
        }),
      }),
      new InputBlock({
        input: new Input({
          attributes: {
            type: 'text',
            name: 'login',
            id: 'sign-up-login',
            placeholder: 'Логин',
          },
        }),
      }),
      new InputBlock({
        input: new Input({
          attributes: {
            type: 'text',
            name: 'first_name',
            id: 'sign-up-first-name',
            placeholder: 'Имя',
          },
        }),
      }),
      new InputBlock({
        input: new Input({
          attributes: {
            type: 'text',
            name: 'second_name',
            id: 'sign-up-last-name',
            placeholder: 'Фамилия',
          },
        }),
      }),
      new InputBlock({
        input: new Input({
          attributes: {
            type: 'text',
            name: 'phone',
            id: 'sign-up-phone',
            placeholder: 'Телефон',
          },
        }),
      }),
      new InputBlock({
        input: new Input({
          attributes: {
            type: 'password',
            name: 'password',
            id: 'sign-up-password',
            placeholder: 'Пароль',
          },
        }),
      }),
      new InputBlock({
        input: new Input({
          attributes: {
            type: 'password',
            name: 'password_check',
            id: 'sign-up-password-check',
            placeholder: 'Повторите пароль',
          },
        }),
      }),
    ],
  }),
};
