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
import { propsType } from '../../utils/block/types';
import { ErrorMessage } from '../../components/errorMessage';

export class EditProfile extends Block {
  constructor(props: propsType) {
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
  errorMessage: new ErrorMessage({
    errorText: errorsMessages.email,
  }),
});

const inputLoginBlock = new InputBlock({
  label: 'Логин',
  input: inputLogin,
  errorMessage: new ErrorMessage({
    errorText: errorsMessages.login,
  }),
});

const inputFirstNameBlock = new InputBlock({
  label: 'Имя',
  input: inputFirstName,
  errorMessage: new ErrorMessage({
    errorText: errorsMessages.first_name,
  }),
});

const inputSecondNameBlock = new InputBlock({
  label: 'Фамилия',
  input: inputSecondName,
  errorMessage: new ErrorMessage({
    errorText: errorsMessages.second_name,
  }),
});

const inputDisplayNameBlock = new InputBlock({
  label: 'Имя в чате',
  input: inputDisplayName,
  errorMessage: new ErrorMessage({
    errorText: errorsMessages.first_name,
  }),
});

const inputPhoneBlock = new InputBlock({
  label: 'Телефон',
  input: inputPhone,
  errorMessage: new ErrorMessage({
    errorText: errorsMessages.phone,
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

inputDisplayName.setProps({
  events: {
    blur: validateInput(inputDisplayNameBlock),
    focus: validateInput(inputDisplayNameBlock),
  },
});

inputPhone.setProps({
  events: {
    blur: validateInput(inputPhoneBlock),
    focus: validateInput(inputPhoneBlock),
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
  errorMessage: new ErrorMessage({
    errorText: errorsMessages.form,
  }),
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
