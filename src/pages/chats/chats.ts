import Block from '../../utils/block/block';
import template from './chats.tmpl';
import { ChatFeed } from './components/chatFeed';
import { ChatItem } from './components/chatItem';
import { MessageFeed } from './components/messageFeed';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { ChatTop } from './components/messageFeed/components/chatTop';
import { Avatar } from '../../components/avatar';
import { ChatMiddle } from './components/messageFeed/components/chatMiddle';
import { Message } from './components/messageFeed/components/message';
import { ChatBottom } from './components/messageFeed/components/chatBottom';
import { Form } from '../../components/form';

export class Chats extends Block {
  constructor(props) {
    const newProps = {
      ...props,
      className: `chats ${props.className ?? ''}`,
    };

    super('div', newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}
export const getChatsData = () => ({
  chatFeed: new ChatFeed({
    input: new Input({
      initialClassName: 'feed__search-input',
      attributes: {
        type: 'text',
        placeholder: 'Поиск',
      },
    }),
    chatsList: [
      new ChatItem(
        {
          avatar: 'https://i.pinimg.com/originals/b6/46/bd/b646bd99f792ac04c5d25a3bef085f5c.jpg',
          name: 'Бильбо Бэггинс',
          lastMessage: 'Привет!',
          lastMessageTime: '6:00',
          newMessagesCount: '2',
        },
      ),
      new ChatItem(
        {
          avatar: 'https://i.pinimg.com/736x/39/c5/ec/39c5ec0ff5d5d8a0fb1c4fa934b27cc8.jpg',
          name: 'Торин Дубощит',
          lastMessage: 'Дубекар!',
          lastMessageTime: '18:00',
          newMessagesCount: '3',
        },
      ),
      new ChatItem(
        {
          avatar: 'https://www.koukalek.cz/www/ir/actor-images/carodej-radagast-990--mm1024x768.jpg',
          name: 'Радагаст Бурый',
          lastMessage: 'Зеленый лес болен, Гендальф!',
          lastMessageTime: '10:08',
          newMessagesCount: '1',
        },
      ),
      new ChatItem(
        {
          avatar: 'https://avatarko.ru/img/kartinka/33/film_gnom_32281.jpg',
          name: 'Балин',
          lastMessage: 'Это драконья болезнь. Я уже видел такое...',
          lastMessageTime: '19:08',
          newMessagesCount: '1',
        },
      ),
    ],
  }),
  messageFeed: new MessageFeed(),
});

export const chatsItemData = {
  ...getChatsData(),
  messageFeed: new MessageFeed({
    chatItem: true,
    chatTop: new ChatTop({
      avatar: new Avatar({
        className: 'avatar_size_50 avatar_margin_none',
        url: 'https://i.pinimg.com/originals/b6/46/bd/b646bd99f792ac04c5d25a3bef085f5c.jpg',
      }),
      interlocutorName: 'Бильбо Беггинс',
      settingsButton: new Button({
        initialClassName: 'chat-top__settings-button',
      }),
    }),
    chatMiddle: new ChatMiddle({
      date: '24 февраля',
      messages: [
        new Message({
          avatar: new Avatar({
            className: 'avatar_size_50 avatar_margin_none',
            url: 'https://i.pinimg.com/originals/b6/46/bd/b646bd99f792ac04c5d25a3bef085f5c.jpg',
          }),
          text: 'Доброе утро!',
          time: '6:00',
          sent: true,
          delivered: true,
          read: true,
        }),
        new Message({
          avatar: new Avatar({
            className: 'avatar_size_50 avatar_margin_none',
            url: 'https://gamebomb.ru/files/galleries/001/a/a6/142164.jpg',
          }),
          className: 'message_self',
          text: `Что Вы хотите этим сказать? Желаете мне доброго 
                утра или утверждаете, что утро доброе и не важно, 
                что я о нем думаю? Или может Вы хотите сказать, что
                испытали на себе доброту этого утра? Или Вы 
                считаете, что все должны быть добрыми в это утро?`,
          time: '6:03',
          sent: true,
          delivered: true,
          read: true,
        }),
        new Message({
          avatar: new Avatar({
            className: 'avatar_size_50 avatar_margin_none',
            url: 'https://i.pinimg.com/originals/b6/46/bd/b646bd99f792ac04c5d25a3bef085f5c.jpg',
          }),
          text: 'Все это сразу, я полагаю.',
          time: '6:04',
          sent: true,
          delivered: true,
          read: true,
        }),
        new Message({
          avatar: new Avatar({
            className: 'avatar_size_50 avatar_margin_none',
            url: 'https://i.pinimg.com/originals/b6/46/bd/b646bd99f792ac04c5d25a3bef085f5c.jpg',
          }),
          text: 'Я могу Вам помочь?',
          time: '6:05',
          sent: true,
          delivered: true,
          read: true,
        }),
        new Message({
          avatar: new Avatar({
            className: 'avatar_size_50 avatar_margin_none',
            url: 'https://gamebomb.ru/files/galleries/001/a/a6/142164.jpg',
          }),
          className: 'message_self',
          text: 'Это мы скоро узнаем. Я ищу того, кто готов отправиться на встречу приключениям.',
          time: '6:06',
          sent: true,
          delivered: true,
          read: true,
        }),
      ],
    }),
    chatBottom: new ChatBottom({
      form: new Form({
        initialClassName: 'chat-bottom-form',
        template: '{{{attachButton}}} {{{input}}} {{{sendButton}}}',
        input: new Input({
          initialClassName: 'message-input',
          attributes: {
            type: 'text',
            name: 'message',
            placeholder: 'Сообщение',
          },
        }),
        sendButton: new Button({
          initialClassName: 'send-message-button',
        }),
        attachButton: new Button({
          initialClassName: 'attach-button',
        }),
      }),
    }),
  }),
};
