import { AuthApi, SigninData, SignupData } from '../api/AuthApi';
import router from '../utils/router/router';
import store from '../utils/store/store';
import { parseJSON } from '../utils/parseJSON/parseJSON';
import chatsController from './ChatsController';

export class AuthController {
  private _api: AuthApi;

  constructor() {
    this._api = new AuthApi();
  }

  signup = (data: SignupData) => {
    this._api.signup(data).then(({ response, status }) => {
      if (status === 200) {
        this.signin(data);
      } else {
        const { auth: { errors = [] } = {} } = store.getState();
        store.setState('auth.errors', [...errors, response]);
      }
    }).catch((error) => {
      const { auth: { errors = [] } = {} } = store.getState();
      store.setState('auth.errors', [...errors, error]);
    });
  };

  signin = async (data: SigninData) => {
    try {
      await this._api.signin(data);

      this.fetchUser();
      chatsController.getChats();
    } catch (error) {
      const { auth: { errors = [] } = {} } = store.getState();
      store.setState('auth.errors', [...errors, error]);
    }
  };

  logout = () => {
    this._api.logout().then(() => {
      store.setState('user', null);
      store.setState('chats', null);
      store.setState('auth', null);
      router.go('/');
    }).catch((error) => {
      const { auth: { errors = [] } = {} } = store.getState();
      store.setState('auth.errors', [...errors, error]);
    });
  };

  fetchUser = () => {
    store.setState('user.isLoading', true);

    this._api.getUser().then(({ response, status }) => {
      const { data, error } = parseJSON(response);

      if (status === 200 && data) {
        store.setState('user.data', data);
        router.go('/messenger');
      } else {
        const { user: { errors = [] } = {} } = store.getState();
        store.setState('user.errors', [...errors, response, error]);
      }
    }).finally(() => {
      setTimeout(() => store.setState('user.isLoading', false), 1000);
    }).catch((error) => {
      store.setState('user.error', error);
    });
  };
}

export default new AuthController();
