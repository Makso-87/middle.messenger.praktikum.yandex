import Block from '../../utils/block/block';
import { Avatar } from '../../components/avatar';
import { Button } from '../../components/button';
import { InputBlock } from '../../components/inputBlock';
import { Input } from '../../components/input';
import { formTemplate, template } from './editProfile.tmpl';
import { Form } from '../../components/form';
import { Link } from '../../components/link';

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
  console.log(data);
};

export const editProfileData = {
  form: new Form({
    className: 'form_edit-profile',
    template: formTemplate,
    avatar: new Avatar({
      url: 'https://gamebomb.ru/files/galleries/001/a/a6/142164.jpg',
      inputId: 'avatar',
      input: new Input({
        initialClassName: 'avatar__change-button-input',
        attributes: {
          type: 'file',
          name: 'avatar',
          id: 'avatar',
        },
      }),
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
      new InputBlock({
        label: 'Почта',
        input: new Input({
          attributes: {
            name: 'email',
            id: 'edit-email',
            placeholder: 'Почта',
            type: 'email',
          },
        }),
      }),
      new InputBlock({
        label: 'Логин',
        input: new Input({
          attributes: {
            name: 'login',
            id: 'edit-login',
            placeholder: 'Логин',
            type: 'text',
          },
        }),
      }),
      new InputBlock({
        label: 'Имя',
        input: new Input({
          attributes: {
            name: 'first_name',
            id: 'edit-first-name',
            placeholder: 'Имя',
            type: 'text',
          },
        }),
      }),
      new InputBlock({
        label: 'Фамилия',
        input: new Input({
          attributes: {
            name: 'second_name',
            id: 'edit-last-name',
            placeholder: 'Фамилия',
            type: 'text',
          },
        }),
      }),
      new InputBlock({
        label: 'Имя в чате',
        input: new Input({
          attributes: {
            name: 'display_name',
            id: 'edit-display-name',
            placeholder: 'Имя в чате',
            type: 'text',
          },
        }),
      }),
      new InputBlock({
        label: 'Телефон',
        input: new Input({
          attributes: {
            name: 'phone',
            id: 'edit-phone',
            placeholder: 'Телефон',
            type: 'text',
          },
        }),
      }),
    ],
  }),
};
