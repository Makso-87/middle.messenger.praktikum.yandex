import { AuthApi, SigninData, SignupData } from '../api/AuthApi';
import router from '../utils/router/router';
import store from '../utils/store/store';
// import { authenticationControl } from '../utils/authenticationControl/authenticationControl';

export class AuthController {
  private _api: AuthApi;

  constructor() {
    this._api = new AuthApi();
  }

  signup = (data: SignupData) => {
    this._api.signup(data).then(({ status }) => {
      if (status === 200) {
        this.signin(data);
      }
    }).catch((error) => {
      store.setState('auth.error', error);
    });
  };

  signin = async (data: SigninData) => {
    try {
      await this._api.signin(data);

      this.fetchUser();
    } catch (error) {
      store.setState('auth.error', error);
    }
  };

  logout = () => {
    this._api.logout().then(() => {
      store.setState('user', null);
      router.go('/');
    }).catch((error) => {
      store.setState('auth.error', error);
    });
  };

  fetchUser = () => {
    store.setState('user.isLoading', true);

    this._api.getUser().then(({ response, status }) => {
      if (status === 200) {
        store.setState('user.data', JSON.parse(response));
        router.go('/messenger');
      } else {
        store.setState('user.error', JSON.parse(response));
      }
    }).finally(() => {
      setTimeout(() => store.setState('user.isLoading', false), 1000);
    }).catch((error) => {
      store.setState('user.error', error);
    });
  };
}

export default new AuthController();
