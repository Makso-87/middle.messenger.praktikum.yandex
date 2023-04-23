import { BaseApi } from './BaseApi';

export interface SignupData<T extends Record<string, string> = any> {
  first_name: T,
  second_name: T,
  login: T,
  email: T,
  password: T,
  phone: T
}

export interface SigninData {
  login: string,
  password: string
}

export interface UserData {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string,
  avatar: string
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

  create = undefined;

  read = undefined;

  update = undefined;

  delete = undefined;
}
