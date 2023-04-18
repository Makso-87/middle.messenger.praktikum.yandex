import Block from '../../../../../../utils/block/block';
import { template } from './chatTop.tmpl';
import { PropsInterface } from '../../../../../../utils/block/types';
import { observe } from '../../../../../../hocs/withStore';
import { Avatar } from '../../../../../../components/avatar';
import { Link } from '../../../../../../components/link';
import { CustomComponent } from '../../../../../../components/customComponent/customComponent';
import { PopupMenu } from '../../../../../../components/popupMenu';

interface ChatTopProps extends PropsInterface {}

export class ChatTop extends Block<ChatTopProps> {
  constructor(props: ChatTopProps) {
    const newProps = {
      ...props,
      className: `chat-top ${props.className ?? ''}`,
    };

    super('div', newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const ObservedCurrentChatAvatar = observe(({ chats }) => ({ url: chats?.data?.currentChat?.avatar }))(Avatar);
const ObservedCurrentChatTop = observe(({ chats }) => ({ interlocutorName: chats?.data?.currentChat?.title }))(ChatTop);

const popupMenu = new PopupMenu({
  items: [
    new CustomComponent({
      tagName: 'li',
      text: 'Добавить пользователя',
    }),
    new CustomComponent({
      tagName: 'li',
      text: 'Удалить чат',
    }),
  ],
});

export const chatTop = new ObservedCurrentChatTop({
  avatar: new ObservedCurrentChatAvatar({
    className: 'avatar_size_50 avatar_margin_none',
  }),
  settingsButton: new Link({
    className: 'chat-top__settings-button',
    events: {
      click: (event: Event) => {
        event.preventDefault();
        popupMenu.show();
      },
    },
  }),
  popupMenu,
});
