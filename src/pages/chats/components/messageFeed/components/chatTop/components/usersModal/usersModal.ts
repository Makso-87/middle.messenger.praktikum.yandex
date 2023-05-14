import { ModalPopup } from '../../../../../../../../components/modalPopup';
import { CustomComponent } from '../../../../../../../../components/customComponent';
import { observe } from '../../../../../../../../hocs/withStore';
import store from '../../../../../../../../utils/store/store';
import Block from '../../../../../../../../utils/block/block';
import { Button } from '../../../../../../../../components/button';
import chatsController from '../../../../../../../../controllers/ChatsController';
import { User } from '../../../../../../../../models/user';

const deleteUsersButton = new Button({
  text: 'Удалить',
  className: 'button_height-40 button_width-135 button_margin-top-20',
});

deleteUsersButton.hide();

const getUsersList = (list: User[] = []): Block[] | undefined => {
  if (!list.length) {
    return [];
  }

  return list.filter((item) => item.id !== store.getState().user?.data?.id).map((user: User) => new CustomComponent(
    {
      tagName: 'li',
      initialClassName: 'chat-users-modal__users-item',
      content: [],
      text: user.login,
      events: {
        click: () => {
          const { users = {}, chats: { data: { currentChat: { users: chatUsers } } } } = store.getState();
          const { data: { deleteUsersList = [] } = {} } = users;

          const userExistInList = deleteUsersList.filter((addUserItem) => addUserItem.id === user.id);

          if (!userExistInList.length) {
            const newUsersList = chatUsers.filter((userItem) => userItem.id !== user.id);
            store.setState('chats.data.currentChat.users', [...newUsersList]);
            store.setState('users.data.deleteUsersList', [...deleteUsersList, { ...user }]);
          }

          if (store.getState().users?.data?.deleteUsersList?.length) {
            deleteUsersButton.show();
          }
        },
      },
    },
  ));
};

const getUsersToDeleteList = (list: User[] = []): Block[] | undefined => {
  if (!list.length) {
    return [];
  }

  return list.map((user: User) => new CustomComponent(
    {
      tagName: 'li',
      initialClassName: 'chat-users-modal__users-item',
      content: [],
      text: user.login,
      events: {
        click: () => {
          const {
            users: { data: { deleteUsersList = [] } },
            chats: { data: { currentChat: { users: chatUsers = [] } } },
          } = store.getState();
          const userExistInList = chatUsers.filter((deleteUserItem) => deleteUserItem.id === user.id);

          if (!userExistInList.length) {
            const newUsersList = deleteUsersList.filter((userItem) => userItem.id !== user.id);
            store.setState('users.data.deleteUsersList', [...newUsersList]);
            store.setState('chats.data.currentChat.users', [...chatUsers, { ...user }]);
          }

          if (!store.getState().users?.data?.deleteUsersList?.length) {
            deleteUsersButton.hide();
          }
        },
      },
    },
  ));
};

const ExistingUsersList = observe(({ chats }) => ({
  content: getUsersList(chats?.data?.currentChat?.users ?? []),
}))(CustomComponent as typeof Block);

const UsersListToDelete = observe(({ users }) => ({
  content: getUsersToDeleteList(users?.data?.deleteUsersList ?? []),
}))(CustomComponent as typeof Block);

export const usersModal = new ModalPopup({
  className: 'chat-users-modal',
  content: new CustomComponent({
    tagName: 'div',
    initialClassName: 'chat-users-modal__content',
    content: [
      new CustomComponent({
        tagName: 'div',
        initialClassName: 'chat-users-modal__users-lists-container',
        content: [
          new CustomComponent({
            tagName: 'div',
            text: 'Доступные пользователи:',
            initialClassName: 'chat-users-modal__users-list-container',
            content: [
              new ExistingUsersList({
                tagName: 'ul',
                initialClassName: 'chat-users-modal__users-list',
              }),
            ],
          }),
          new CustomComponent({
            tagName: 'div',
            text: 'Удалите пользователей из чата:',
            initialClassName: 'chat-users-modal__users-list-container',
            content: [
              new UsersListToDelete({
                tagName: 'ul',
                initialClassName: 'chat-users-modal__users-list',
              }),
              deleteUsersButton,
            ],
          }),
        ],
      }),
    ],
  }),
});

deleteUsersButton.setProps({
  events: {
    click: () => {
      const { users: { data: { deleteUsersList } }, chats: { data: { currentChat } } } = store.getState() || {};

      if (deleteUsersList) {
        const usersIds = deleteUsersList.map((item) => item.id);
        const deleteUsersData = {
          users: usersIds,
          chatId: currentChat.id,
        };
        chatsController.deleteUsersFromChat(deleteUsersData);
        usersModal.hide();
        deleteUsersButton.hide();
      }
    },
  },
});

usersModal.hide();
