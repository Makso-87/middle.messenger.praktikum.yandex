import {
  FindUserData, UserApi, UserPasswordData, UserProfileData,
} from '../api/UserApi';
import store from '../utils/store/store';
import router from '../utils/router/router';
import { parseJSON } from '../utils/parseJSON/parseJSON';

export class UserController {
  _api: UserApi;

  constructor() {
    this._api = new UserApi();
  }

  updateUserData = (data: UserProfileData) => {
    this._api.updateUserData(data).then(({ response, status }) => {
      const { data: parsedData, error } = parseJSON(response);

      if (status === 200 && parsedData) {
        store.setState('user.data', parsedData);
        router.go('/messenger');
      } else {
        const { user: { errors = [] } = {} } = store.getState();
        store.setState('user.errors', [...errors, response, error]);
      }
    }).catch((error) => {
      const { user: { errors = [] } = {} } = store.getState();
      store.setState('user.errors', [...errors, error]);
    });
  };

  updateUserPassword = (data: UserPasswordData) => {
    this._api.updateUserPassword(data).then(({ response, status }) => {
      if (status === 200) {
        router.go('/messenger');
      } else {
        const { user: { errors = [] } = {} } = store.getState();
        store.setState('user.errors', [...errors, response]);
      }
    }).catch((error) => {
      const { user: { errors = [] } = {} } = store.getState();
      store.setState('user.errors', [...errors, error]);
    });
  };

  updateUserAvatar = (data: FormData) => {
    this._api.updateUserAvatar(data).then(({ response, status }) => {
      const { data: parsedData, error } = parseJSON(response);

      if (status === 200 && parsedData) {
        store.setState('user.data', parsedData);
        router.go('/messenger');
      } else {
        const { user: { errors = [] } = {} } = store.getState();
        store.setState('user.errors', [...errors, response, error]);
      }
    }).catch((error) => {
      store.setState('user.updateError', error);
    });
  };

  findUser = (data: FindUserData) => {
    this._api.findUser(data).then(({ response, status }) => {
      const { data: parsedData, error } = parseJSON(response);

      if (status === 200 && parsedData) {
        store.setState('users.data.list', parsedData);
        router.go('/messenger');
      } else {
        const { user: { errors = [] } = {} } = store.getState();
        store.setState('user.errors', [...errors, response, error]);
      }
    }).catch((error) => {
      const { user: { errors = [] } = {} } = store.getState();
      store.setState('user.errors', [...errors, error]);
    });
  };
}

export default new UserController();
