import Block from '../../../../../../utils/block/block';
import { template } from './chatMiddle.tmpl';
import { PropsInterface } from '../../../../../../utils/block/types';
import { Avatar } from '../../../../../../components/avatar';
import { Message } from '../message';

interface ChatMiddleProps extends PropsInterface {}

export class ChatMiddle extends Block<ChatMiddleProps> {
  constructor(props: ChatMiddleProps) {
    const newProps = {
      ...props,
      className: `chat-middle ${props.className ?? ''}`,
    };

    super('div', newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const chatMiddle = new ChatMiddle({
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
});
