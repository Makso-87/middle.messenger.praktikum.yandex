import './components/messageFeed/components/chatTop/chatTop.scss';
import './components/messageFeed/components/chatMiddle/chatMiddle.scss';
import './components/messageFeed/components/chatBottom/chatBottom.scss';
import Block from '../../utils/block/block';
import store from '../../utils/store/store';
import { template, formTemplate } from './chats.tmpl';
import { ChatFeed } from './components/chatFeed';
import { ChatItem } from './components/chatItem';
import { MessageFeed } from './components/messageFeed';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { Avatar } from '../../components/avatar';
import { Form } from '../../components/form';
import { InputBlock } from '../../components/inputBlock';
import { errorsMessages } from '../../utils/validators/validateInput';
import { PropsInterface } from '../../utils/block/types';
import { observe } from '../../hocs/withStore';
import chatsController from '../../controllers/ChatsController';
import { ModalPopup } from '../../components/modalPopup';
import { onSubmitForm as onSubmitAddChat } from '../../utils/onSubmitForm/onSubmitForm';
import { ErrorMessage } from '../../components/errorMessage';
import { chatTop } from './components/messageFeed/components/chatTop/chatTop';
import { chatMiddle } from './components/messageFeed/components/chatMiddle/chatMiddle';
import { chatBottom } from './components/messageFeed/components/chatBottom/chatBottom';
import { createWSConnection } from '../../utils/ws/ws';
import { getTime } from '../../utils/mydash/getTime';
import { ChatType } from '../../models/chat';
import { NavLink } from '../../components/navLink';

interface ChatsProps extends PropsInterface {}

export class Chats extends Block<ChatsProps> {
  constructor(props: ChatsProps) {
    const newProps = {
      ...props,
      className: `chats ${props.className ?? ''}`,
    };

    super('div', newProps);
  }

  render() {
    chatsController.getChats();
    return this.compile(template, this.props);
  }
}

const getChatsList = (list = []): Block[] | undefined => {
  if (!list.length) {
    return [];
  }

  const { user: currentUser } = store.getState();

  return list.map((chatItem: ChatType) => {
    const {
      id, avatar, title, last_message: lastMessage, unread_count: unreadCount,
    } = chatItem;
    return new ChatItem(
      {
        avatar: new Avatar({ url: avatar, className: 'avatar_size_50 chat-item__avatar' }),
        name: title ?? '',
        author: currentUser?.data?.login === lastMessage?.user.login ? 'Вы' : lastMessage?.user.first_name ?? lastMessage?.user.login,
        lastMessage: lastMessage?.content ?? '',
        lastMessageTime: getTime(lastMessage?.time ?? ''),
        newMessagesCount: unreadCount || null,
        events: {
          click: async () => {
            store.setState('chats.data.currentChat', { ...chatItem, messages: [], token: '' });
            await chatsController.getChatToken({ chatId: id });

            const { user, chats: { data: { currentChat } } } = store.getState() || {};
            const webSocket = createWSConnection(user.data.id, currentChat.id, currentChat.token);
            store.setState('sockets', { [currentChat.id]: webSocket });
            chatsController.getChatUsers({ chatId: id });

            webSocket.onopen = () => {
              webSocket.send(JSON.stringify({ type: 'get old', content: '0' }));
            };
          },
        },
      },
    );
  });
};

const addChatTitleInput = new InputBlock({
  input: new Input({
    attributes: {
      initialClassName: '',
      name: 'title',
      type: 'text',
      placeholder: 'Введите название чата',
    },
  }),
  errorMessage: new ErrorMessage({
    errorText: errorsMessages.title,
  }),
});

const submitNewChatButton = new Button({
  text: 'Добавить чат',
  className: 'button_margin-top-10',
});

const addChatForm = new Form({
  template: formTemplate,
  input: addChatTitleInput,
  className: 'chat-feed__add-chat-form',
  submitNewChatButton,
  errorMessage: new ErrorMessage({
    errorText: errorsMessages.form,
  }),
});

const modalPopup = new ModalPopup({
  content: addChatForm,
});

modalPopup.hide();

const controller = async (data: unknown) => {
  await chatsController.addChat(data);
  modalPopup.hide();
};

addChatForm.setProps({
  events: {
    submit: onSubmitAddChat(addChatForm, [addChatTitleInput], controller),
  },
});

const openModal = (event: Event) => {
  event.preventDefault();
  modalPopup.show('flex');
  modalPopup.lockDocument();
};

const addChatButton = new Button({
  text: 'Добавить чат',
  className: 'chat-feed__add-chat',
  events: {
    click: openModal,
  },
});

const messageFeedContent = {
  chatTop,
  chatMiddle,
  chatBottom,
};

const ChatFeedObserved = observe(({ chats }) => ({ chatsList: getChatsList(chats?.data?.list) }))(ChatFeed);
const MessageFeedObserved = observe(({ chats }) => ({
  currentChat: chats?.data?.currentChat,
  chatTop: chats?.data?.currentChat ? messageFeedContent.chatTop : undefined,
  chatMiddle: chats?.data?.currentChat ? messageFeedContent.chatMiddle : undefined,
  chatBottom: chats?.data?.currentChat ? messageFeedContent.chatBottom : undefined,
}))(MessageFeed);

export const chatsData = {
  chatFeed: new ChatFeedObserved({
    addChatButton,
    modalPopup,
    profileButton: new NavLink({
      text: 'Профиль',
      link: '/profile',
    }),
    input: new Input({
      initialClassName: 'feed__search-input',
      attributes: {
        type: 'text',
        placeholder: 'Поиск',
      },
    }),
  }),
  messageFeed: new MessageFeedObserved({}),
};
