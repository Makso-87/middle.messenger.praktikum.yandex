import { isArray } from '../mydash/isArray';
import store from '../store/store';
import chatsController from '../../controllers/ChatsController';

export class WS {
  static API_URL = 'wss://ya-praktikum.tech/ws/chats';

  userId: string;

  chatId: string;

  token: string;

  constructor({ userId = '', chatId = '', token = '' }) {
    this.userId = userId;
    this.chatId = chatId;
    this.token = token;
  }

  create = () => {
    const { userId, chatId, token } = this;
    return new WebSocket(`${WS.API_URL}/${userId}/${chatId}/${token}`);
  };
}

export const createWSConnection = (userId: string, chatId: string, token: string) => {
  const socket = new WS({ userId, chatId, token }).create();
  let interval;

  socket.addEventListener('open', () => {
    interval = setInterval(() => {
      socket.send(JSON.stringify({ type: 'ping' }));
    }, 5000);
  });

  socket.addEventListener('close', () => {
    clearInterval(interval);
  });

  socket.addEventListener('message', (event: MessageEvent) => {
    const data = JSON.parse(event.data);

    if (isArray(data)) {
      const { chats: { data: { currentChat: { messages = [] } } } } = store.getState();

      if (data.length) {
        store.setState('chats.data.currentChat.messages', [...data.reverse(), ...messages]);
      }
    }

    if (data.user_id && data.id) {
      const { chats: { data: { currentChat: { messages } } } } = store.getState();
      store.setState('chats.data.currentChat.messages', [...messages, data]);
      chatsController.getChats();
    }
  });

  socket.addEventListener('error', (event: ErrorEvent) => {
    clearInterval(interval);
    store.setState('websocket', event.message);
  });

  return socket;
};
