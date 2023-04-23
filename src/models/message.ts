import { User } from './user';

export type MessageType = {
    id: number;
    chat_id: number;
    user_id: number;
    type: string;
    time: string;
    content: string;
    is_read: boolean;
    file: null | unknown;
}

export type LastMessageType = {
    id: number;
    user: User;
    time: string;
    content: string;
}
