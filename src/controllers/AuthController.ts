import { AuthApi, SigninData, SignupData } from '../api/AuthApi';
import router from '../utils/router/router';
import store from '../utils/store/store';

export class AuthController {
  private _api: AuthApi;

  constructor() {
    this._api = new AuthApi();
  }

  signup = (data: SignupData) => {
    this._api.signup(data).then(() => {
      router.go('/messenger');
    }).catch(console.error);
  };

  signin = async (data: SigninData) => {
    try {
      await this._api.signin(data);

      this.fetchUser();
      router.go('/messenger');
    } catch (e) {
      store.setState('user.hasError', true);
    }
  };

  logout = () => {
    this._api.logout().then(() => {
      router.go('/');
    }).catch(console.error);
  };

  fetchUser = () => {
    store.setState('user.isLoading', true);

    this._api.getUser().then(({ response }) => {
      store.setState('user.data', JSON.parse(response));
      console.log(store.getState());
    }).finally(() => {
      setTimeout(() => store.setState('user.isLoading', false), 1000);
    });
  };
}

export default new AuthController();
