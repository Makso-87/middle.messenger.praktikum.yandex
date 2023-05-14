import { BaseApi } from './BaseApi';
import { FormRequestData } from '../utils/onSubmitForm/onSubmitForm';

export interface UserProfileData extends FormRequestData {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface UserPasswordData extends FormRequestData {
  oldPassword: string;
  newPassword: string;
}

export interface FindUserData extends FormRequestData {
  login: string;
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
    data,
  });

  updateUserPassword = (data: UserPasswordData) => this.fetch.put('/password', {
    headers: { 'Content-Type': 'application/json' },
    credentials: true,
    data: { ...data },
  });

  findUser = (data: FindUserData) => this.fetch.post('/search', {
    headers: { 'Content-Type': 'application/json' },
    credentials: true,
    data: { ...data },
  });
}
