import template from './profile.tmpl';
import Block from '../../utils/block/block';
import { Button } from '../../components/button';
import { ProfileDataItem } from './components/profileDataItem';
import { Avatar } from '../../components/avatar';
import { Input } from '../../components/input';
import { Link } from '../../components/link';

export class Profile extends Block {
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

export const profileData = {
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
  buttonEditProfile: new Link({
    className: 'button',
    link: 'edit-profile',
    text: 'Изменить данные',
  }),
  buttonChangePassword: new Link({
    className: 'button',
    link: 'change-password',
    text: 'Изменить пароль',
  }),
  buttonBack: new Link({
    className: 'button button_type_2',
    link: '/',
    text: 'Выйти',
  }),
  data: [
    new ProfileDataItem({
      profileDataKey: 'Почта',
      profileDataValue: 'gendalf@valinor.me',
    }),
    new ProfileDataItem({
      profileDataKey: 'Логин',
      profileDataValue: 'gendalf-white',
    }),
    new ProfileDataItem({
      profileDataKey: 'Имя',
      profileDataValue: 'Гендальф',
    }),
    new ProfileDataItem({
      profileDataKey: 'Фамилия',
      profileDataValue: 'Белый',
    }),
    new ProfileDataItem({
      profileDataKey: 'Имя в чате',
      profileDataValue: 'wizard',
    }),
    new ProfileDataItem({
      profileDataKey: 'Телефон',
      profileDataValue: '+7 (999) 999 99 99',
    }),
  ],
};
