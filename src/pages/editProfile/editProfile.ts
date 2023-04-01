import Block from '../../utils/block/block';
import { Avatar } from '../../components/avatar';
import { Button } from '../../components/button';
import { InputBlock } from '../../components/inputBlock';
import { Input } from '../../components/input';
import { formTemplate, template } from './editProfile.tmpl';
import { Form } from '../../components/form';
import { Link } from '../../components/link';
import { errorsMessages, validateInput } from '../../utils/validators/validateInput';

export class EditProfile extends Block {
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

const onSubmitForm = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = {
    login: formData.get('login'),
    email: formData.get('email'),
    avatar: formData.get('avatar'),
    first_name: formData.get('first_name'),
    second_name: formData.get('second_name'),
    display_name: formData.get('display_name'),
    phone: formData.get('phone'),
  };

  // eslint-disable-next-line no-console
  console.log(data);
};

const inputAvatar = new Input({
  initialClassName: 'avatar__change-button-input',
  attributes: {
    type: 'file',
    name: 'avatar',
    id: 'avatar',
  },
});

const inputEmail = new Input({
  attributes: {
    name: 'email',
    id: 'edit-email',
    placeholder: 'Почта',
    type: 'email',
  },
});

const inputLogin = new Input({
  attributes: {
    name: 'login',
    id: 'edit-login',
    placeholder: 'Логин',
    type: 'text',
  },
});

const inputFirstName = new Input({
  attributes: {
    name: 'first_name',
    id: 'edit-first-name',
    placeholder: 'Имя',
    type: 'text',
  },
});

const inputSecondName = new Input({
  attributes: {
    name: 'second_name',
    id: 'edit-last-name',
    placeholder: 'Фамилия',
    type: 'text',
  },
});

const inputDisplayName = new Input({
  attributes: {
    name: 'display_name',
    id: 'edit-display-name',
    placeholder: 'Имя в чате',
    type: 'text',
  },
});

const inputPhone = new Input({
  attributes: {
    name: 'phone',
    id: 'edit-phone',
    placeholder: 'Телефон',
    type: 'text',
  },
});

const inputEmailBlock = new InputBlock({
  errorText: errorsMessages.email,
  label: 'Почта',
  input: inputEmail,
});

const inputLoginBlock = new InputBlock({
  errorText: errorsMessages.login,
  label: 'Логин',
  input: inputLogin,
});

const inputFirstNameBlock = new InputBlock({
  errorText: errorsMessages.first_name,
  label: 'Имя',
  input: inputFirstName,
});

const inputSecondNameBlock = new InputBlock({
  errorText: errorsMessages.second_name,
  label: 'Фамилия',
  input: inputSecondName,
});

const inputDisplayNameBlock = new InputBlock({
  errorText: errorsMessages.first_name,
  label: 'Имя в чате',
  input: inputDisplayName,
});

const inputPhoneBlock = new InputBlock({
  errorText: errorsMessages.phone,
  label: 'Телефон',
  input: inputPhone,
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

inputDisplayName.setProps({
  events: {
    blur: validateInput(inputDisplayNameBlock),
  },
});

inputPhone.setProps({
  events: {
    blur: validateInput(inputPhoneBlock),
  },
});

export const editProfileData = {
  form: new Form({
    className: 'form_edit-profile',
    template: formTemplate,
    avatar: new Avatar({
      url: 'https://gamebomb.ru/files/galleries/001/a/a6/142164.jpg',
      inputId: 'avatar',
      input: inputAvatar,
    }),
    firstName: 'Гендальф',
    buttonSave: new Button({
      text: 'Сохранить',
    }),
    buttonCancel: new Link({
      text: 'Отменить',
      link: 'chats',
      className: 'button button_type_2',
    }),
    events: {
      submit: onSubmitForm,
    },
    inputs: [
      inputEmailBlock,
      inputLoginBlock,
      inputFirstNameBlock,
      inputSecondNameBlock,
      inputDisplayNameBlock,
      inputPhoneBlock,
    ],
  }),
};
