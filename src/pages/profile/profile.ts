import template from './profile.tmpl';
import Block from '../../utils/block/block';
import { ProfileDataItem } from './components/profileDataItem';
import { Avatar } from '../../components/avatar';
import { PropsInterface } from '../../utils/block/types';
import { observe } from '../../hocs/withStore';
import { Button } from '../../components/button';
import authController from '../../controllers/AuthController';
import { NavLink } from '../../components/navLink';
import router from '../../utils/router/router';

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

const AvatarObserved = observe((state) => ({ url: state?.user?.data?.avatar || '' }))(Avatar);
export const ProfileObserved = observe((state) => ({ firstName: state?.user?.data?.first_name || '' }))(Profile);

const onLogout = (event) => {
  event.preventDefault();
  authController.logout();
};

const EmailDataObserved = observe(({ user }) => ({ profileDataValue: user?.data?.email }))(ProfileDataItem);
const LoginDataObserved = observe(({ user }) => ({ profileDataValue: user?.data?.login }))(ProfileDataItem);

const FirstNameDataObserved = observe(({ user }) => (
  { profileDataValue: user?.data?.first_name }
))(ProfileDataItem);

const SecondNameDataObserved = observe(({ user }) => (
  { profileDataValue: user?.data?.second_name }
))(ProfileDataItem);

const DisplayNameDataObserved = observe(({ user }) => (
  { profileDataValue: user?.data?.display_name ?? '' }
))(ProfileDataItem);

const PhoneDataObserved = observe(({ user }) => (
  { profileDataValue: user?.data?.phone ?? '' }
))(ProfileDataItem);

export const profileData = {
  avatar: new AvatarObserved({ url: '' }),
  firstName: 'Гендальф',
  buttonEditProfile: new NavLink({
    className: 'button',
    link: '/settings',
    text: 'Изменить данные',
  }),
  buttonChangePassword: new NavLink({
    className: 'button',
    link: '/change-password',
    text: 'Изменить пароль',
  }),
  buttonBack: new Button({
    className: 'button button_type_2',
    text: 'Назад',
    events: {
      click: (e) => {
        e.preventDefault();
        router.back();
      },
    },
  }),
  buttonLogout: new Button({
    className: 'button button_type_2',
    text: 'Выйти',
    events: {
      click: onLogout,
    },
  }),
  data: [
    new EmailDataObserved({
      profileDataKey: 'Почта',
      profileDataValue: '',
    }),
    new LoginDataObserved({
      profileDataKey: 'Логин',
      profileDataValue: '',
    }),
    new FirstNameDataObserved({
      profileDataKey: 'Имя',
      profileDataValue: '',
    }),
    new SecondNameDataObserved({
      profileDataKey: 'Фамилия',
      profileDataValue: '',
    }),
    new DisplayNameDataObserved({
      profileDataKey: 'Имя в чате',
      profileDataValue: '',
    }),
    new PhoneDataObserved({
      profileDataKey: 'Телефон',
      profileDataValue: '',
    }),
  ],
};
