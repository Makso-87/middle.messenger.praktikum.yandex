import * as handlebars from "handlebars";
import "../../components/form";
import template from "./auth.tmpl";
export const authTemplate = handlebars.compile(template);
export const authData = {
    title: 'Вход',
    buttonEnter: {
        text: 'Войти',
        link: 'chats',
    },
    formLink: {
        text: 'Зарегистрироваться',
        link: 'registration',
    },
    inputs: [
        {
            id: 'sign-in-login',
            placeholder: 'Логин',
            type: 'text',
            name: 'login'
        },
        {
            id: 'sign-in-password',
            placeholder: 'Пароль',
            type: 'password',
            name: 'password'
        }
    ]
};
