import template from './profile.tmpl';
import Block from '../../utils/block/block';
import { ProfileDataItem } from './components/profileDataItem';
import { Avatar } from '../../components/avatar';
import { Link } from '../../components/link';
import { PropsInterface } from '../../utils/block/types';

interface ProfileProps extends PropsInterface {}

export class Profile extends Block<ProfileProps> {
  constructor(props: ProfileProps) {
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
      profileDataValue: '+79999999999',
    }),
  ],
};
