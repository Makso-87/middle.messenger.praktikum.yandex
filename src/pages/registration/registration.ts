import Block from '../../utils/block/block';
import { Form } from '../../components/form';
import { Input } from '../../components/input';
import { formTemplate, template } from './registration.tmpl';
import { InputBlock } from '../../components/inputBlock';
import { Button } from '../../components/button';
import { errorsMessages, validateInput } from '../../utils/validators/validateInput';

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
    oldPassword: formData.get('oldPassword'),
    newPassword: formData.get('newPassword'),
  };

  // eslint-disable-next-line no-console
  console.log(data);
};

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
  errorText: errorsMessages.email,
  input: inputEmail,
});

const inputLoginBlock = new InputBlock({
  errorText: errorsMessages.login,
  input: inputLogin,
});

const inputFirstNameBlock = new InputBlock({
  errorText: errorsMessages.first_name,
  input: inputFirstName,
});

const inputSecondNameBlock = new InputBlock({
  errorText: errorsMessages.second_name,
  input: inputSecondName,
});

const inputPhoneBlock = new InputBlock({
  errorText: errorsMessages.phone,
  input: inputPhone,
});

const inputPasswordBlock = new InputBlock({
  errorText: errorsMessages.password,
  input: inputPassword,
});

const inputPasswordCheckBlock = new InputBlock({
  errorText: errorsMessages.password,
  input: inputPasswordCheck,
});

inputEmail.setProps({
  events: {
    blur: validateInput(inputEmailBlock),
  },
});

inputLogin.setProps({
  events: {
    blur: validateInput(inputLoginBlock),
  },
});

inputFirstName.setProps({
  events: {
    blur: validateInput(inputFirstNameBlock),
  },
});

inputSecondName.setProps({
  events: {
    blur: validateInput(inputSecondNameBlock),
  },
});

inputPhone.setProps({
  events: {
    blur: validateInput(inputPhoneBlock),
  },
});

inputPassword.setProps({
  events: {
    blur: validateInput(inputPasswordBlock),
  },
});

inputPasswordCheck.setProps({
  events: {
    blur: validateInput(inputPasswordCheckBlock),
  },
});

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
      inputEmailBlock,
      inputLoginBlock,
      inputFirstNameBlock,
      inputSecondNameBlock,
      inputPhoneBlock,
      inputPasswordBlock,
      inputPasswordCheckBlock,
    ],
  }),
};
