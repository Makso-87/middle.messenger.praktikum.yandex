import * as handlebars from "handlebars";
import template from "./registration.tmpl";

export const registrationTemplate = handlebars.compile(template);

export const registrationData = {
    title: 'Регистрация',
    buttonEnter: {
        text: 'Зарегистрироваться',
        link: '/',
    },
    formLink: {
        text: 'Войти',
        link: '/',
    },
    inputs: [
        {
            type: "email",
            name: "email",
            id: "sign-up-email",
            placeholder: "Почта",
        },
        {
            type: "text",
            name: "login",
            id: "sign-up-login",
            placeholder: "Логин",
        },
        {
            type: "text",
            name: "first_name",
            id: "sign-up-first-name",
            placeholder: "Имя",
        },
        {
            type: "text",
            name: "second_name",
            id: "sign-up-last-name",
            placeholder: "Фамилия",
        },
        {
            type: "text",
            name: "phone",
            id: "sign-up-phone",
            placeholder: "Телефон",
        },
        {
            type: "password",
            name: "password",
            id: "sign-up-password",
            placeholder: "Пароль",
        },
        {
            type: "password",
            name: "password_check",
            id: "sign-up-password-check",
            placeholder: "Повторите пароль",
        },
    ]
};
