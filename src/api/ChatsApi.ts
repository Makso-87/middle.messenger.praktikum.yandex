import { BaseApi } from './BaseApi';
import { FormRequestData } from '../utils/onSubmitForm/onSubmitForm';

export interface AddChatData extends FormRequestData {
  title: string;
}

export interface AddUsersToChatData extends FormRequestData {
  users: number[];
  chatId: number;
}

export interface ChatManipulationData extends FormRequestData {
  chatId: number;
}

export interface SetChatAvatarData extends ChatManipulationData {
  avatar: File;
}

export interface DeleteUsersFromChatData extends AddUsersToChatData {}

export class ChatsApi extends BaseApi {
  constructor() {
    super('/chats');
  }

  addChat = (data: AddChatData) => this.fetch.post('', {
    headers: { 'Content-Type': 'application/json' },
    credentials: true,
    data: { ...data },
  });

  deleteChat = (data: ChatManipulationData) => this.fetch.delete('', {
    headers: { 'Content-Type': 'application/json' },
    credentials: true,
    data: { ...data },
  });

  getChats = () => this.fetch.get('', {
    credentials: true,
  });

  addUsersToChat = (data: AddUsersToChatData) => this.fetch.put('/users', {
    headers: { 'Content-Type': 'application/json' },
    credentials: true,
    data: { ...data },
  });

  deleteUsersFromChat = (data: DeleteUsersFromChatData) => this.fetch.delete('/users', {
    headers: { 'Content-Type': 'application/json' },
    credentials: true,
    data: { ...data },
  });

  getChatToken = (data: ChatManipulationData) => this.fetch.post(`/token/${data.chatId}`, {
    credentials: true,
  });

  getNewMessagesCount = (data: ChatManipulationData) => this.fetch.get(`/new/${data.chatId}`, {
    credentials: true,
  });

  getChatUsers = (data: ChatManipulationData) => this.fetch.get(`/${data.chatId}/users`, {
    credentials: true,
  });

  setChatAvatar = (data: FormData) => this.fetch.put('/avatar', {
    credentials: true,
    formData: true,
    data: { ...data },
  });
}
