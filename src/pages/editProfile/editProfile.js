import * as handlebars from "handlebars";
import template from "./editProfile.tmpl";

export const editProfileTemplate = handlebars.compile(template);

export const editProfileData = {
    avatar: 'https://gamebomb.ru/files/galleries/001/a/a6/142164.jpg',
    firstName: 'Гендальф',
    buttonSave: {
        text: 'Сохранить',
        link: 'chats',
    },
    buttonCancel: {
        text: 'Отменить',
        link: 'chats',
        classes: 'button_type_2',
    },
    inputs: [
        {
            name: 'email',
            label: 'Почта',
            id: 'edit-email',
            placeholder: 'Почта',
            type: 'email',
        },
        {
            name: 'login',
            label: 'Логин',
            id: 'edit-login',
            placeholder: 'Логин',
            type: 'text',
        },
        {
            name: 'first_name',
            label: 'Имя',
            id: 'edit-first-name',
            placeholder: 'Имя',
            type: 'text',
        },
        {
            name: 'second_name',
            label: 'Фамилия',
            id: 'edit-last-name',
            placeholder: 'Фамилия',
            type: 'text',
        },
        {
            name: 'display_name',
            label: 'Имя в чате',
            id: 'edit-display-name',
            placeholder: 'Имя в чате',
            type: 'text',
        },
        {
            name: 'phone',
            label: 'Телефон',
            id: 'edit-phone',
            placeholder: 'Телефон',
            type: 'text',
        },
    ]
};
