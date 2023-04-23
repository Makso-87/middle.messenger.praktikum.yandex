import Block from '../../../../../../utils/block/block';
import { template } from './chatMiddle.tmpl';
import { PropsInterface } from '../../../../../../utils/block/types';
import { Avatar } from '../../../../../../components/avatar';
import { Message } from '../message';
import { MessageType } from '../../../../../../models/message';
import store from '../../../../../../utils/store/store';
import { observe } from '../../../../../../hocs/withStore';
import { getTime } from '../../../../../../utils/mydash/getTime';

interface ChatMiddleProps extends PropsInterface {
  messages?: Block[];
}

export class ChatMiddle extends Block<ChatMiddleProps> {
  constructor(props: ChatMiddleProps) {
    const newProps = {
      ...props,
      className: `chat-middle ${props.className ?? ''}`,
    };

    super('div', newProps);
  }

  componentDidUpdate() {
    // const element = this.getContent();
    // const { scrollHeight } = element;
    // element.scrollTo(0, scrollHeight);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const getMessages = (list: MessageType[] = []) => {
  if (!list.length) {
    return [];
  }

  const { user: authUser, chats: { data: { currentChat: { users } } } } = store.getState();

  return list.map((messageItem: MessageType) => {
    const [user] = users.filter((usersItem) => usersItem.id === messageItem.user_id);

    return new Message({
      className: `${messageItem.user_id === authUser.data.id ? 'message_self' : ''}`,
      avatar: new Avatar({
        className: 'avatar_size_50 avatar_margin_none',
        url: user?.avatar ?? '',
      }),
      text: messageItem.content,
      time: getTime(messageItem.time),
      sent: true,
      delivered: true,
      read: messageItem.is_read,
    });
  });
};

const ChatMiddleObserved = observe(({ chats }) => ({
  messages: getMessages(chats?.data?.currentChat?.messages),
}))(ChatMiddle);

export const chatMiddle = new ChatMiddleObserved({
  events: {
    scroll: (event: Event) => {
      const { scrollTop } = event.target as HTMLElement;

      if (scrollTop === 0) {
        const { sockets, chats: { data: { currentChat } } } = store.getState();
        const webSocket = sockets[currentChat.id];

        webSocket.send(JSON.stringify({ type: 'get old', content: String(currentChat.messages.length - 1) }));
      }
    },
  },
});
