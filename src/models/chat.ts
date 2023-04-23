import { LastMessageType } from './message';

export type ChatType = {
    id: number,
    title: string,
    avatar: string | null,
    unread_count: number,
    last_message: LastMessageType | null;
};
