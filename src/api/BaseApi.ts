import MyFetch from '../utils/myFetch/myFetch';

export abstract class BaseApi {
  protected fetch: MyFetch;

  protected constructor(endpoint: string) {
    this.fetch = new MyFetch(endpoint);
  }
}
