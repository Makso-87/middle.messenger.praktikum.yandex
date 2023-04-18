import { AddChatData, ChatsApi } from '../api/ChatsApi';
import store from '../utils/store/store';

const { setState, getState } = store;

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
      console.error(error);
    });
  };

  getChats = () => {
    this._api.getChats().then(({ response }) => {
      const chats = JSON.parse(response);
      setState('chats.data.list', chats);
    }).catch((error) => {
      setState('user.chatsError', error);
      console.error(error);
    });
  };
}

export default new ChatsController();
