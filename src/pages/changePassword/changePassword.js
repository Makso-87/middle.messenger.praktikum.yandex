import * as handlebars from "handlebars";
import template from "./changePassword.tmpl";

export const changePasswordTemplate = handlebars.compile(template);

export const changePasswordData = {
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
            type: 'password',
            label: 'Текущий пароль',
            name: 'oldPassword',
            id: 'old-password',
            placeholder: 'Текущий пароль',
        },
        {
            type: 'password',
            label: 'Новый пароль',
            name: 'newPassword',
            id: 'new-password',
            placeholder: 'Новый пароль',
        }
    ]
};
