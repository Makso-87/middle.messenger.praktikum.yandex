import './common_styles.scss';
import './fonts.scss';
import './layout/main/index.ts';
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
import Block from './utils/block/block';

authController.fetchUser();

router.use('/', Auth as typeof Block, authData)
  .use('/sign-up', Registration as typeof Block, registrationData)
  .use('/messenger', Chats as typeof Block, chatsData)
  .use('/profile', ProfileObserved as typeof Block, profileData)
  .use('/settings', EditProfile as typeof Block, editProfileData)
  .use('/change-password', ChangePassword as typeof Block, changePasswordData)
  .use('/error-404', Error as typeof Block, {
    errorCode: '404',
    errorDescription: [new ErrorDescription({ text: 'Кажется, Вы сбились с пути' })],
    errorButton: new NavLink({
      initialClassName: 'button',
      text: 'Вернуться к чатам',
      link: '/messenger',
      className: 'link button_margin-top-40',
    }),
  })
  .use('/error-500', Error as typeof Block, {
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
      link: '/messenger',
      className: 'link button_margin-top-40',
    }),
  })
  .start();
