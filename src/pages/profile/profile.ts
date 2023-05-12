import template from './profile.tmpl';
import Block from '../../utils/block/block';
import { ProfileDataItem } from './components/profileDataItem';
import { Avatar } from '../../components/avatar';
import { PropsInterface } from '../../utils/block/types';
import { observe } from '../../hocs/withStore';
import { Button } from '../../components/button';
import authController from '../../controllers/AuthController';
import { NavLink } from '../../components/navLink';

interface ProfileProps extends PropsInterface {}

export class Profile extends Block<ProfileProps> {
  constructor(props: ProfileProps) {
    const newProps = {
      ...props,
      className: `profile ${props.className ?? ''}`,
    };

    super(newProps, 'div');
  }

  render() {
    return this.compile(template, this.props);
  }
}

const AvatarObserved = observe((state) => ({ url: state?.user?.data?.avatar || '' }))(Avatar as typeof Block);
export const ProfileObserved = observe((state) => ({ firstName: state?.user?.data?.first_name || '' }))(Profile as typeof Block);

const onLogout = (event: Event) => {
  event.preventDefault();
  authController.logout();
};

const EmailDataObserved = observe(({ user }) => ({ profileDataValue: user?.data?.email }))(ProfileDataItem as typeof Block);
const LoginDataObserved = observe(({ user }) => ({ profileDataValue: user?.data?.login }))(ProfileDataItem as typeof Block);

const FirstNameDataObserved = observe(({ user }) => (
  { profileDataValue: user?.data?.first_name }
))(ProfileDataItem as typeof Block);

const SecondNameDataObserved = observe(({ user }) => (
  { profileDataValue: user?.data?.second_name }
))(ProfileDataItem as typeof Block);

const DisplayNameDataObserved = observe(({ user }) => (
  { profileDataValue: user?.data?.display_name ?? '' }
))(ProfileDataItem as typeof Block);

const PhoneDataObserved = observe(({ user }) => (
  { profileDataValue: user?.data?.phone ?? '' }
))(ProfileDataItem as typeof Block);

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
  buttonBack: new NavLink({
    className: 'button button_type_2',
    text: 'Назад',
    link: '/messenger',
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
