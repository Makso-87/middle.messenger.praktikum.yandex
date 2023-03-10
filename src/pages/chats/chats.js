import * as handlebars from "handlebars";
import template from './chats.tmpl';
import '../chats/components/chatFeed';
import '../chats/components/messageFeed';

export const chatsTemplate = handlebars.compile(template);

export const chatsTemplateData = {
   chatsList: [
       {
           avatar: 'https://i.pinimg.com/originals/b6/46/bd/b646bd99f792ac04c5d25a3bef085f5c.jpg',
           name: 'Бильбо Бэггинс',
           lastMessage: 'Привет!',
           lastMessageTime: '6:00',
           newMessagesCount: '2'
       },
       {
           avatar: 'https://i.pinimg.com/736x/39/c5/ec/39c5ec0ff5d5d8a0fb1c4fa934b27cc8.jpg',
           name: 'Торин Дубощит',
           lastMessage: 'Дубекар!',
           lastMessageTime: '18:00',
           newMessagesCount: '3'
       },
       {
           avatar: 'https://www.koukalek.cz/www/ir/actor-images/carodej-radagast-990--mm1024x768.jpg',
           name: 'Радагаст Бурый',
           lastMessage: 'Зеленый лес болен, Гендальф!',
           lastMessageTime: '10:08',
           newMessagesCount: '1'
       },
       {
           avatar: 'https://avatarko.ru/img/kartinka/33/film_gnom_32281.jpg',
           name: 'Балин',
           lastMessage: 'Это драконья болезнь. Я уже видел такое...',
           lastMessageTime: '19:08',
           newMessagesCount: '1'
       },
   ]
};
