import { BaseApi } from './BaseApi';

export interface SignupData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface SigninData {
  login: string;
  password: string;
}

export interface UserData {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

export class AuthApi extends BaseApi {
  constructor() {
    super('/auth');
  }

  signup(data: SignupData) {
    return this.fetch.post('/signup', {
      headers: { 'Content-Type': 'application/json' },
      data: { ...data },
    });
  }

  signin(data: SigninData) {
    return this.fetch.post('/signin', {
      credentials: true,
      headers: { 'Content-Type': 'application/json' },
      data: { ...data },
    });
  }

  logout() {
    return this.fetch.post('/logout', {
      credentials: true,
    });
  }

  getUser() {
    return this.fetch.get('/user', {
      credentials: true,
    });
  }
}
