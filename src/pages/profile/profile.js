import * as handlebars from "handlebars";
import template from "./profile.tmpl";
import '../profile/components/profileDataItem';
import '../../components/avatar';

export const profileTemplate = handlebars.compile(template);

export const profileData = {
    avatar: 'https://gamebomb.ru/files/galleries/001/a/a6/142164.jpg',
    firstName: 'Гендальф',
    buttonEditProfile: {
        link: 'edit-profile',
        text: 'Изменить данные',
    },
    buttonChangePassword: {
        link: 'change-password',
        text: 'Изменить пароль',
    },
    buttonBack: {
        link: '/',
        classes: 'button_type_2',
        text: 'Выйти',
    },
    data: [
        {
            profileDataKey: 'Почта',
            profileDataValue: 'gendalf@valinor.me',
        },
        {
            profileDataKey: 'Логин',
            profileDataValue: 'gendalf-white',
        },
        {
            profileDataKey: 'Имя',
            profileDataValue: 'Гендальф',
        },
        {
            profileDataKey: 'Фамилия',
            profileDataValue: 'Белый',
        },
        {
            profileDataKey: 'Имя в чате',
            profileDataValue: 'wizard',
        },
        {
            profileDataKey: 'Телефон',
            profileDataValue: '+7 (999) 999 99 99',
        },
    ]
}
