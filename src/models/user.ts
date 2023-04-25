export interface User {
    id: number;
    avatar: string | null;
    first_name: string;
    second_name: string;
    display_name: string | null;
    email: string;
    login: string;
    phone: string | null;
}

export interface ChatUser extends User {
    id: number;
    avatar: string | null;
    first_name: string;
    second_name: string;
    display_name: string | null;
    login: string;
    email: string;
    phone: string;
    role: string;
}
