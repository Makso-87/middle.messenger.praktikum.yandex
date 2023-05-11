import { LastMessageType, MessageType } from './message';
import { User } from './user';

export type Chat = {
    id: number,
    title: string,
    avatar: string | null,
    unread_count: number,
    last_message: LastMessageType | null;
    messages?: MessageType[]
    token?: string;
    users?: User[];
};
