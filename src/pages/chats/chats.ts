import Block from '../../utils/block/block';
import { template, formTemplate} from './chats.tmpl';
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
import { InputBlock } from '../../components/inputBlock';
import {errorsMessages, isValidInputValue} from '../../utils/validators/validateInput';
import { PropsInterface } from '../../utils/block/types';
import { NavLink } from '../../components/navLink';
import { observe } from '../../hocs/withStore';
import chatsController from '../../controllers/ChatsController';
import {ModalPopup} from "../../components/modalPopup";
import { onSubmitForm as onSubmitAddChat } from "../../utils/onSubmitForm/onSubmitForm";
import {ErrorMessage} from "../../components/errorMessage";

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

const onSubmitForm = (event: InputEvent) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = {
    message: formData.get('message'),
    attach: formData.get('attach'),
  };

  // eslint-disable-next-line no-console
  console.log(data);
};

const sendButton = new Button({
  initialClassName: 'send-message-button',
  className: 'send-message-button_disabled',
  attributes: {
    disabled: 'disabled',
  },
});

const validateInput = (event: InputEvent) => {
  const { value, name } = event.target;
  const result = isValidInputValue(value, name);

  if (result) {
    sendButton.removeAttributes(['disabled']);
    sendButton.removeClassNames(['send-message-button_disabled']);
  } else {
    sendButton.setProps({
      className: 'send-message-button_disabled',
      attributes: {
        disabled: 'disabled',
      },
    });
  }
};

const inputMessage = new Input({
  initialClassName: 'message-input',
  attributes: {
    type: 'text',
    name: 'message',
    placeholder: 'Сообщение',
  },
});

inputMessage.setProps({
  events: {
    input: validateInput,
  },
});

const getChatsList = (list = []): Block[] | undefined => {
  if (!list.length) {
    return [];
  }

  return list.map((chatItem) => new ChatItem(
      {
        avatar: new Avatar({ url: chatItem.avatar, className: 'avatar_size_50 chat-item__avatar'}),
        name: chatItem.title ?? '',
        lastMessage: chatItem.last_message ?? '',
        lastMessageTime: '',
        newMessagesCount: chatItem.unread_count,
      },
  ));
});



const addChatTitleInput = new InputBlock({
  input: new Input({
    attributes: {
      initialClassName: '',
      name: 'title',
      type: 'text',
      placeholder: 'Введите название чата',
    }
  }),
  errorMessage: new ErrorMessage({
    errorText: errorsMessages.title,
  }),
});

const closeModal = (event: Event) => {
  event.preventDefault();
  modalPopup.hide();
};

const openModal = (event: Event) => {
  event.preventDefault();
  modalPopup.show('flex');
};

const closeModalButton =  new Button({
  text: '',
  initialClassName: 'modal-close-button',
  events: {
    click: closeModal,
  },
});

const submitNewChatButton = new Button({
  text: 'Добавить чат',
  className: 'button_margin-top-10',
});

const controller = async (data: unknown) => {
  await chatsController.addChat(data);
  modalPopup.hide();
};

const addChatForm = new Form({
  template: formTemplate,
  input: addChatTitleInput,
  closeButton: closeModalButton,
  className: 'chat-feed__add-chat-form',
  submitNewChatButton,
  errorMessage: new ErrorMessage({
    errorText: errorsMessages.form,
  }),
});

addChatForm.setProps({
  events: {
    submit: onSubmitAddChat(addChatForm, [addChatTitleInput], controller),
  }
})

const modalPopup = new ModalPopup({
  content: addChatForm,
});

modalPopup.hide();

const addChatButton =  new Button({
  text: 'Добавить чат',
  className: 'chat-feed__add-chat',
  events: {
    click: openModal,
  },
});

const ChatFeedObserved = observe(({ chats }) => ({ chatsList: getChatsList(chats?.data?.list) }))(ChatFeed);

export const getChatsData = () => ({
  chatFeed: new ChatFeedObserved({
    addChatButton,
    modalPopup,
    input: new Input({
      initialClassName: 'feed__search-input',
      attributes: {
        type: 'text',
        placeholder: 'Поиск',
      },
    }),
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
      settingsButton: new NavLink({
        className: 'chat-top__settings-button',
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
        input: inputMessage,
        sendButton,
        events: { submit: onSubmitForm },
        attachButton: new InputBlock({
          initialClassName: 'attach-button',
          label: ' ',
          id: 'attach',
          input: new Input({
            initialClassName: 'attach-button-input',
            attributes: {
              type: 'file',
              name: 'attach',
              id: 'attach',
            },
          }),
        }),
      }),
    }),
  }),
};
