import Block from '../../utils/block/block';
import { Avatar } from '../../components/avatar';
import { Button } from '../../components/button';
import { InputBlock } from '../../components/inputBlock';
import { Input } from '../../components/input';
import { formTemplate, template } from './editProfile.tmpl';
import { Form } from '../../components/form';
import { Link } from '../../components/link';
import { errorsMessages, validateInput } from '../../utils/validators/validateInput';
import { onSubmitForm } from '../../utils/onSubmitForm/onSubmitForm';

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

const inputs = [
  inputEmailBlock,
  inputLoginBlock,
  inputFirstNameBlock,
  inputSecondNameBlock,
  inputDisplayNameBlock,
  inputPhoneBlock,
];

const form = new Form({
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
  inputs,
});

form.setProps({
  events: {
    submit: onSubmitForm(form, inputs),
  },
});

export const editProfileData = {
  form,
};
