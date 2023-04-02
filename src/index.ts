import './common_styles.scss';
import './fonts.scss';
import './layout/main/index';
import { Auth, authData } from './pages/auth';
import { Chats, getChatsData, chatsItemData } from './pages/chats';
import { Error } from './pages/error';
import { Profile, profileData } from './pages/profile';
import { Registration, registrationData } from './pages/registration';
import { EditProfile, editProfileData } from './pages/editProfile';
import { ChangePassword, changePasswordData } from './pages/changePassword';
import { render } from './utils/render/render';
import { ErrorDescription } from './pages/error/components/errorDescription';
import { Link } from './components/link';
import Block from './utils/block/block';

const { location: { pathname } } = window;

type routingType = {
  [key: string]: {
    page: Block,
  }
}

const routing: routingType = {
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
    page: new Chats({ ...chatsItemData }),
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
      errorButton: new Link({
        initialClassName: 'button',
        text: 'Вернуться к чатам',
        link: 'chats',
        className: 'link button_margin-top-40',
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
      errorButton: new Link({
        initialClassName: 'button',
        text: 'Вернуться к чатам',
        link: 'chats',
        className: 'link button_margin-top-40',
      }),
    }),
  },
};

render('.app', routing[pathname].page);
