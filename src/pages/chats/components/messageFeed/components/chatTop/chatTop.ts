import Block from '../../../../../../utils/block/block';
import { template } from './chatTop.tmpl';
import { PropsInterface } from '../../../../../../utils/block/types';
import { observe } from '../../../../../../hocs/withStore';
import { Avatar } from '../../../../../../components/avatar';
import { popupMenu } from './components/poupMenu/popupMenu';
import { addUsersModal } from './components/addUserModal';
import { Button } from '../../../../../../components/button';
import { usersModal } from './components/usersModal';
import { avatarModal } from './components/avatarModal';

interface ChatTopProps extends PropsInterface {}

export class ChatTop extends Block<ChatTopProps> {
  constructor(props: ChatTopProps) {
    const newProps = {
      ...props,
      className: `chat-top ${props.className ?? ''}`,
    };

    super(newProps, 'div');
  }

  render() {
    return this.compile(template, this.props);
  }
}

const ObservedCurrentChatAvatar = observe(({ chats }) => ({ url: chats?.data?.currentChat?.avatar }))(Avatar as typeof Block);
const ObservedCurrentChatTop = observe(({ chats }) => ({ interlocutorName: chats?.data?.currentChat?.title }))(ChatTop as typeof Block);

export const chatTop = new ObservedCurrentChatTop({
  avatar: new ObservedCurrentChatAvatar({
    className: 'avatar_size_50 avatar_margin_none',
  }),
  addUsersModal,
  usersModal,
  avatarModal,
  settingsButton: new Button({
    className: 'chat-top__settings-button',
    events: {
      click: (event: Event) => {
        event.preventDefault();
        if (popupMenu.getHiddenValue()) {
          popupMenu.show();
        } else {
          popupMenu.hide();
        }
      },
    },
  }),
  popupMenu,
});
