import {
  AddChatData, AddUsersToChatData, ChatManipulationData, ChatsApi, DeleteUsersFromChatData, SetChatAvatarData,
} from '../api/ChatsApi';
import store from '../utils/store/store';

const { setState } = store;

class ChatsController {
  _api: ChatsApi;

  constructor() {
    this._api = new ChatsApi();
  }

  addChat = (data: AddChatData) => {
    this._api.addChat(data).then(({ status }) => {
      if (status === 200) {
        this.getChats();
      }
    }).catch((error) => {
      setState('user.chatsError', error);
    });
  };

  getChats = () => {
    this._api.getChats().then(({ response }) => {
      const chats = JSON.parse(response);
      setState('chats.data.list', chats);
    }).catch((error) => {
      setState('user.chatsError', error);
    });
  };

  addUsersToChat = (data: AddUsersToChatData) => {
    this._api.addUsersToChat(data).then(() => {
      const { chats: { data: { currentChat } } } = store.getState();
      store.setState('users.data.list', []);
      store.setState('users.data.addUsersList', []);
      this.getChatUsers({ chatId: currentChat.id });
    }).catch((error) => {
      setState('user.chatsError', error);
    });
  };

  getChatToken = (data: ChatManipulationData) => this._api.getChatToken(data).then(({ response }) => {
    const token = JSON.parse(response);
    store.setState('chats.data.currentChat', token);
    return token;
  }).catch((error) => {
    setState('user.chatsError', error);
  });

  getChatUsers = (data: ChatManipulationData) => {
    this._api.getChatUsers(data).then(({ response }) => {
      const users = JSON.parse(response);
      store.setState('chats.data.currentChat.users', [...users]);
      return users;
    }).catch((error) => {
      setState('user.chatsError', error);
    });
  };

  setChatAvatar = (data: SetChatAvatarData) => {
    this._api.setChatAvatar(data).then(({ response }) => {
      store.setState('chats.data.currentChat', JSON.parse(response));
    }).catch((error) => {
      setState('user.chatsError', error);
    });
  };

  deleteChat = (data: ChatManipulationData) => {
    this._api.deleteChat(data).then(() => {
      store.setState('chats.data.currentChat', null);
      this.getChats();
    }).catch((error) => {
      setState('user.chatsError', error);
    });
  };

  deleteUsersFromChat = (data: DeleteUsersFromChatData) => {
    this._api.deleteUsersFromChat(data).then(() => {
      const { chats: { data: { currentChat } } } = store.getState();
      store.setState('users.data.deleteUsersList', []);
      this.getChatUsers({ chatId: currentChat.id });
    }).catch((error) => {
      setState('user.chatsError', error);
    });
  };
}

export default new ChatsController();
