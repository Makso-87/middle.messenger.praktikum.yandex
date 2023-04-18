import { BaseApi } from './BaseApi';

export interface UserProfileData<T extends Record<string, string> = any> {
  first_name: T,
  second_name: T,
  display_name: T,
  login: T,
  email: T,
  phone: T
}

export interface UserPasswordData<T extends Record<string, string> = any> {
  oldPassword: T;
  newPassword: T;
}

export class UserApi extends BaseApi {
  constructor() {
    super('/user');
  }

  updateUserData = (data: UserProfileData) => this.fetch.put('/profile', {
    headers: { 'Content-Type': 'application/json' },
    credentials: true,
    data: { ...data },
  });

  updateUserAvatar = (data: FormData) => this.fetch.put('/profile/avatar', {
    credentials: true,
    formData: true,
    data,
  });

  updateUserPassword = (data: UserPasswordData) => this.fetch.put('/profile', {
    headers: { 'Content-Type': 'application/json' },
    credentials: true,
    data: { ...data },
  });

  findUser = () => {};

  create = undefined;

  read = undefined;

  update = undefined;

  delete = undefined;
}
