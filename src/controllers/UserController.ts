import {
  FindUserData, UserApi, UserPasswordData, UserProfileData,
} from '../api/UserApi';
import store from '../utils/store/store';
import router from '../utils/router/router';

export class UserController {
  _api: UserApi;

  constructor() {
    this._api = new UserApi();
  }

  updateUserData = (data: UserProfileData) => {
    this._api.updateUserData(data).then(({ response }) => {
      store.setState('user.data', JSON.parse(response));
      router.go('/messenger');
    }).catch((error) => {
      store.setState('user.updateError', error);
    });
  };

  updateUserPassword = (data: UserPasswordData) => {
    this._api.updateUserPassword(data).then(() => {
      router.go('/messenger');
    }).catch((error) => {
      store.setState('user.updateError', error);
    });
  };

  updateUserAvatar = (data: FormData) => {
    this._api.updateUserAvatar(data).then(({ response }) => {
      store.setState('user.data', JSON.parse(response));
    }).catch((error) => {
      store.setState('user.updateError', error);
    });
  };

  findUser = (data: FindUserData) => {
    this._api.findUser(data).then(({ response }) => {
      store.setState('users.data.list', JSON.parse(response));
    }).catch((error) => {
      store.setState('users.findError', error);
    });
  };
}

export default new UserController();
