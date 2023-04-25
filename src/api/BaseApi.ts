import MyFetch from '../utils/myFetch/myFetch';

export abstract class BaseApi {
  protected fetch: MyFetch;

  protected constructor(endpoint: string) {
    this.fetch = new MyFetch(endpoint);
  }

  public abstract create?(data: unknown): Promise<unknown>;

  public abstract read?(identifier?: string): Promise<unknown>;

  public abstract update?(identifier: string, data: unknown): Promise<unknown>;

  public abstract delete?(identifier: string): Promise<unknown>;
}
