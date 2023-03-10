import './common_styles.scss';
import './fonts.scss';
import './layout/main/index';
import './pages/auth/index';
import './pages/chats/index';
import './pages/error/index';
import './pages/profile/index';
import './pages/registration/index';
import './components/form/index';
import './components/input/index';
import './components/button/index';
import './components/avatar/index';
import { authData } from "./pages/auth/auth";
import { authTemplate } from './pages/auth/index';
import { registrationTemplate } from "./pages/registration/index";
import { registrationData } from "./pages/registration/registration";
import { chatsTemplate} from "./pages/chats/index";
import { chatsTemplateData } from "./pages/chats/chats";
import { profileTemplate } from "./pages/profile";
import { profileData } from "./pages/profile/profile";
import { editProfileTemplate } from "./pages/editProfile";
import { editProfileData } from "./pages/editProfile/editProfile";
import { changePasswordTemplate } from "./pages/changePassword";
import { changePasswordData } from "./pages/changePassword/changePassword";
import {errorTemplate} from "./pages/error";


const { location: { pathname } } = window;

const routing = {
    '/': {
        template: authTemplate,
        data: authData
    },
    '/registration': {
        template: registrationTemplate,
        data: registrationData
    },
    '/chats': {
        template: chatsTemplate,
        data: chatsTemplateData,
    },
    '/chat-item': {
        template: chatsTemplate,
        data: { ...chatsTemplateData, chatItem: true },
    },
    '/profile': {
        template: profileTemplate,
        data: profileData,
    },
    '/edit-profile': {
        template: editProfileTemplate,
        data: editProfileData,
    },
    '/change-password': {
        template: changePasswordTemplate,
        data: changePasswordData,
    },
    '/error-404': {
        template: errorTemplate,
        data: {
            errorCode: '404',
            errorDescription: ['Кажется сбились с пути'],
            errorButton: {
                text: 'Вернуться к чатам',
                link: 'chats',
                classes: 'button_margin-top-40'
            }
        },
    },
    '/error-500': {
        template: errorTemplate,
        data: {
            errorCode: '500',
            errorDescription: ['Что-то пошло не так!', 'Но мы уже усиленно чиним'],
            errorButton: {
                text: 'Вернуться к чатам',
                link: 'chats',
                classes: 'button_margin-top-40'
            }
        },
    }
}

document.querySelector('.app').innerHTML = routing[pathname].template(routing[pathname].data);
