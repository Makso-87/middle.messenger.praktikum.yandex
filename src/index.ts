import './common_styles.scss';
import './fonts.scss';
import './layout/main/index';
import { Auth, authData } from './pages/auth';
import { Chats, chatsData } from './pages/chats';
import { Error } from './pages/error';
import { ProfileObserved, profileData } from './pages/profile';
import { Registration, registrationData } from './pages/registration';
import { EditProfile, editProfileData } from './pages/editProfile';
import { ChangePassword, changePasswordData } from './pages/changePassword';
import { ErrorDescription } from './pages/error/components/errorDescription';
import router from './utils/router/router';
import authController from './controllers/AuthController';
import { NavLink } from './components/navLink';

authController.fetchUser();

router.use('/', Auth, authData)
  .use('/sign-up', Registration, registrationData)
  .use('/messenger', Chats, chatsData)
  .use('/profile', ProfileObserved, profileData)
  .use('/settings', EditProfile, editProfileData)
  .use('/change-password', ChangePassword, changePasswordData)
  .use('/error-404', Error, {
    errorCode: '404',
    errorDescription: [new ErrorDescription({ text: 'Кажется, сбились с пути' })],
    errorButton: new NavLink({
      initialClassName: 'button',
      text: 'Вернуться к чатам',
      link: 'chats',
      className: 'link button_margin-top-40',
    }),
  })
  .use('/error-500', Error, {
    errorCode: '500',
    errorDescription: [
      new ErrorDescription({
        text: 'Что-то пошло не так!',
      }),
      new ErrorDescription({
        text: 'Но мы уже усиленно чиним',
      }),
    ],
    errorButton: new NavLink({
      initialClassName: 'button',
      text: 'Вернуться к чатам',
      link: 'chats',
      className: 'link button_margin-top-40',
    }),
  })
  .start();
