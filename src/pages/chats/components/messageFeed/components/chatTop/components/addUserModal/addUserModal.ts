import './addUserModal.scss';
import { ModalPopup } from '../../../../../../../../components/modalPopup';
import { CustomComponent } from '../../../../../../../../components/customComponent';
import { Form } from '../../../../../../../../components/form';
import { usersSearchFormTemplate } from './addUserModal.tmpl';
import { Input } from '../../../../../../../../components/input';
import { Button } from '../../../../../../../../components/button';
import { errorsMessages } from '../../../../../../../../utils/validators/validateInput';
import { ErrorMessage } from '../../../../../../../../components/errorMessage';
import { InputBlock } from '../../../../../../../../components/inputBlock';
import userController from '../../../../../../../../controllers/UserController';
import { onSubmitForm } from '../../../../../../../../utils/onSubmitForm/onSubmitForm';
import store from '../../../../../../../../utils/store/store';
import { observe } from '../../../../../../../../hocs/withStore';
import Block from '../../../../../../../../utils/block/block';
import chatsController from '../../../../../../../../controllers/ChatsController';
import { User } from '../../../../../../../../models/user';

const addFindUserInput = new InputBlock({
  input: new Input({
    attributes: {
      initialClassName: '',
      name: 'login',
      type: 'text',
      placeholder: 'Введите логин пользователей',
    },
  }),
  errorMessage: new ErrorMessage({
    errorText: errorsMessages.login,
  }),
});

const form = new Form({
  errorMessage: new ErrorMessage({
    errorText: errorsMessages.form,
  }),
  initialClassName: 'chat-users-modal__form',
  template: usersSearchFormTemplate,
  header: new CustomComponent({
    tagName: 'h2',
    initialClassName: 'chat-users-modal__header',
    text: 'Найти пользователей',
  }),
  inputs: [
    addFindUserInput,
  ],
  button: new Button({
    text: 'Найти',
    className: 'button_margin-left-20 button_height-40 button_width-135',
  }),
});

const controller = (data: unknown) => {
  userController.findUser(data);
};

form.setProps({
  events: {
    submit: onSubmitForm(form, [addFindUserInput], controller),
  },
});

const addUsersButton = new Button({
  text: 'Добавить',
  className: 'button_height-40 button_width-135 button_margin-top-20',
});

addUsersButton.hide();

const getUsersList = (list: User[] = []): Block[] | undefined => {
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
          const { addUsersList = [], list: usersList = [] } = store.getState().users?.data ?? {};
          const userExistInList = addUsersList.filter((addUserItem: User) => addUserItem.id === user.id);

          if (!userExistInList.length) {
            const newUsersList = usersList.filter((userItem: User) => userItem.id !== user.id);
            store.setState('users.data.list', [...newUsersList]);
            store.setState('users.data.addUsersList', [...addUsersList, { ...user }]);
          }

          if (store.getState().users?.data?.addUsersList?.length) {
            addUsersButton.show();
          }
        },
      },
    },
  ));
};

const getUsersToAddList = (list: User[] = []): Block[] | undefined => {
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
          const { addUsersList = [], list: usersList = [] } = store.getState().users?.data ?? {};
          const userExistInList = usersList.filter((addUserItem: User) => addUserItem.id === user.id);

          if (!userExistInList.length) {
            const newUsersList = addUsersList.filter((userItem: User) => userItem.id !== user.id);
            store.setState('users.data.addUsersList', [...newUsersList]);
            store.setState('users.data.list', [...usersList, { ...user }]);
          }

          if (!store.getState().users?.data?.addUsersList?.length) {
            addUsersButton.hide();
          }
        },
      },
    },
  ));
};

const FoundUsersList = observe(({ users }) => ({ content: getUsersList(users?.data?.list ?? []) }))(CustomComponent);
const UsersListToAdd = observe(({ users }) => ({
  content: getUsersToAddList(users?.data?.addUsersList ?? []),
}))(CustomComponent);

export const addUsersModal = new ModalPopup({
  className: 'chat-users-modal',
  content: new CustomComponent({
    tagName: 'div',
    initialClassName: 'chat-users-modal__content',
    content: [
      form,
      new CustomComponent({
        tagName: 'div',
        initialClassName: 'chat-users-modal__users-lists-container',
        content: [
          new CustomComponent({
            tagName: 'div',
            text: 'Доступные пользователи:',
            initialClassName: 'chat-users-modal__users-list-container',
            content: [
              new FoundUsersList({
                tagName: 'ul',
                initialClassName: 'chat-users-modal__users-list',
              }),
            ],
          }),
          new CustomComponent({
            tagName: 'div',
            text: 'Добавьте пользователей в чат:',
            initialClassName: 'chat-users-modal__users-list-container',
            content: [
              new UsersListToAdd({
                tagName: 'ul',
                initialClassName: 'chat-users-modal__users-list',
              }),
              addUsersButton,
            ],
          }),
        ],
      }),
    ],
  }),
});

addUsersButton.setProps({
  events: {
    click: () => {
      const { users: { data: { addUsersList } }, chats: { data: { currentChat } } } = store.getState() || {};

      if (addUsersList) {
        const usersIds = addUsersList.map((item) => item.id);
        const addUsersData = {
          users: usersIds,
          chatId: currentChat.id,
        };

        chatsController.addUsersToChat(addUsersData);
        addUsersModal.hide();
        addUsersButton.hide();
        form.getContent().reset();
      }
    },
  },
});

addUsersModal.hide();
