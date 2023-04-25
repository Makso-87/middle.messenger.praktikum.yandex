import {
  AddChatData, AddUsersToChatData, ChatManipulationData, ChatsApi, DeleteUsersFromChatData, SetChatAvatarData,
} from '../api/ChatsApi';
import store from '../utils/store/store';
import { parseJSON } from '../utils/parseJSON/parseJSON';

const { setState } = store;

class ChatsController {
  _api: ChatsApi;

  constructor() {
    this._api = new ChatsApi();
  }

  addChat = (data: AddChatData) => {
    this._api.addChat(data).then(({ response, status }) => {
      if (status === 200) {
        this.getChats();
      } else {
        const { chats: { errors = [] } = {} } = store.getState();
        store.setState('chats.errors', [...errors, response, error]);
      }
    }).catch((error) => {
      const { chats: { errors = [] } = {} } = store.getState();
      store.setState('chats.errors', [...errors, error]);
    });
  };

  getChats = () => {
    this._api.getChats().then(({ response, status }) => {
      const { data, error } = parseJSON(response);

      if (status === 200 && data) {
        setState('chats.data.list', data);
      } else {
        const { chats: { errors = [] } } = store.getState();
        setState('chats.errors', [...errors, response, error]);
      }
    }).catch((error) => {
      const { chats: { errors = [] } = {} } = store.getState();
      store.setState('chats.errors', [...errors, error]);
    });
  };

  addUsersToChat = (data: AddUsersToChatData) => {
    this._api.addUsersToChat(data).then(({ response, status }) => {
      if (status == 200) {
        const { chats: { data: { currentChat } } } = store.getState();
        store.setState('users.data.list', []);
        store.setState('users.data.addUsersList', []);
        this.getChatUsers({ chatId: currentChat.id });
      } else {
        const { chats: { errors = [] } = {} } = store.getState();
        store.setState('chats.errors', [...errors, response]);
      }
    }).catch((error) => {
      const { chats: { errors = [] } = {} } = store.getState();
      store.setState('chats.errors', [...errors, error]);
    });
  };

  getChatToken = (data: ChatManipulationData) => this._api.getChatToken(data).then(({ response, status }) => {
    const { data, error } = parseJSON(response);

    if (status === 200 && data) {
      store.setState('chats.data.currentChat', data);
      return data;
    }

    const { chats: { errors = [] } } = store.getState();
    store.setState('chats.errors', [...errors, response, error]);
  }).catch((error) => {
    const { chats: { errors = [] } } = store.getState();
    store.setState('chats.errors', [...errors, error]);
  });

  getChatUsers = (data: ChatManipulationData) => {
    this._api.getChatUsers(data).then(({ response, status }) => {
      const { data: users, error } = parseJSON(response);

      if (status === 200 && data) {
        store.setState('chats.data.currentChat.users', [...users]);
      } else {
        const { chats: { errors = [] } = {} } = store.getState();
        store.setState('chats.errors', [...errors, response, error]);
      }
      return users;
    }).catch((error) => {
      const { chats: { errors = [] } = {} } = store.getState();
      store.setState('chats.errors', [...errors, error]);
    });
  };

  setChatAvatar = (data: SetChatAvatarData) => {
    this._api.setChatAvatar(data).then(({ response, status }) => {
      const { data: parsedData, error } = parseJSON(response);

      if (status === 200 && data) {
        store.setState('chats.data.currentChat', parsedData);
        this.getChats();
      } else {
        const { chats: { errors = [] } = {} } = store.getState();
        store.setState('chats.errors', [...errors, response, error]);
      }
    }).catch((error) => {
      const { chats: { errors = [] } = {} } = store.getState();
      store.setState('chats.errors', [...errors, error]);
    });
  };

  deleteChat = (data: ChatManipulationData) => {
    this._api.deleteChat(data).then(() => {
      store.setState('chats.data.currentChat', null);
      this.getChats();
    }).catch((error) => {
      const { chats: { errors = [] } = {} } = store.getState();
      store.setState('chats.errors', [...errors, error]);
    });
  };

  deleteUsersFromChat = (data: DeleteUsersFromChatData) => {
    this._api.deleteUsersFromChat(data).then(({ response, status }) => {
      if (status === 200) {
        const { chats: { data: { currentChat } } } = store.getState();
        store.setState('users.data.deleteUsersList', []);
        this.getChatUsers({ chatId: currentChat.id });
      } else {
        const { chats: { errors = [] } = {} } = store.getState();
        store.setState('chats.errors', [...errors, response, error]);
      }
    }).catch((error) => {
      const { chats: { errors = [] } = {} } = store.getState();
      store.setState('chats.errors', [...errors, error]);
    });
  };
}

export default new ChatsController();
