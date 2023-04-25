import { CustomComponent } from '../../../../../../../../components/customComponent';
import { PopupMenu } from '../../../../../../../../components/popupMenu';
import { addUsersModal } from '../addUserModal';
import store from '../../../../../../../../utils/store/store';
import chatsController from '../../../../../../../../controllers/ChatsController';
import { usersModal } from '../usersModal';
import { avatarModal } from '../avatarModal';

const openAddUserModal = () => {
  addUsersModal.show('flex');
  addUsersModal.lockDocument();
};

const openUsersModal = () => {
  usersModal.show('flex');
  usersModal.lockDocument();
};

const openAvatarModal = () => {
  avatarModal.show('flex');
  avatarModal.lockDocument();
};

const deleteThisChat = () => {
  const { chats: { data: { currentChat } } } = store.getState();
  chatsController.deleteChat({ chatId: currentChat.id });
};

export const popupMenu = new PopupMenu({
  className: 'chat-top__popup-menu',
  items: [
    new CustomComponent({
      tagName: 'li',
      className: 'chat-top__menu_item',
      text: 'Изменить аватарку',
      events: {
        click: openAvatarModal,
      },
    }),
    new CustomComponent({
      tagName: 'li',
      className: 'chat-top__menu_item',
      text: 'Пользователи',
      events: {
        click: openUsersModal,
      },
    }),
    new CustomComponent({
      tagName: 'li',
      className: 'chat-top__menu_item',
      text: 'Добавить пользователя',
      events: {
        click: openAddUserModal,
      },
    }),
    new CustomComponent({
      tagName: 'li',
      className: 'chat-top__menu_item',
      text: 'Удалить чат',
      events: {
        click: deleteThisChat,
      },
    }),
  ],
});

popupMenu.hide();
