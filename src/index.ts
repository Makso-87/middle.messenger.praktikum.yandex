import './common_styles.scss';
import './fonts.scss';
import './layout/main/index';
import { Auth, authData } from './pages/auth';
import { Chats, getChatsData } from './pages/chats';
import { Error } from './pages/error';
import { Profile, profileData } from './pages/profile';
import { Registration, registrationData } from './pages/registration';
import './components/form';
import './components/input';
import { Button } from './components/button';
import './components/avatar';
import { EditProfile, editProfileData } from './pages/editProfile';
import { ChangePassword, changePasswordData } from './pages/changePassword';
import { render } from './utils/render/render';
import { ErrorDescription } from './pages/error/components/errorDescription';

// eslint-disable-next-line no-undef
const { location: { pathname } } = window;

const routing = {
  '/': {
    page: new Auth(authData),
  },
  '/registration': {
    page: new Registration(registrationData),
  },
  '/chats': {
    page: new Chats(getChatsData()),
  },
  '/chat-item': {
    page: new Chats({ ...getChatsData(), chatItem: true }),
  },
  '/profile': {
    page: new Profile(profileData),
  },
  '/edit-profile': {
    page: new EditProfile(editProfileData),
  },
  '/change-password': {
    page: new ChangePassword(changePasswordData),
  },
  '/error-404': {
    page: new Error({
      errorCode: '404',
      errorDescription: [new ErrorDescription({ text: 'Кажется, сбились с пути' })],
      errorButton: new Button({
        text: 'Вернуться к чатам',
        link: 'chats',
        className: 'button_margin-top-40',
      }),
    }),
  },
  '/error-500': {
    page: new Error({
      errorCode: '500',
      errorDescription: [
        new ErrorDescription({
          text: 'Что-то пошло не так!',
        }),
        new ErrorDescription({
          text: 'Но мы уже усиленно чиним',
        }),
      ],
      errorButton: new Button({
        text: 'Вернуться к чатам',
        link: 'chats',
        className: 'button_margin-top-40',
      }),
    }),
  },
};

render('.app', routing[pathname].page);
