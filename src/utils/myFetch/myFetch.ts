import { queryStringify } from '../mydash/stringifyQuery';

const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class MyFetch {
  static API_URL = 'https://ya-praktikum.tech/api/v2';

  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${MyFetch.API_URL}${endpoint}`;
  }

  get = (path: string = '/', options = {}) => this.request(`${this.endpoint}${path}`, {
    ...options,
    method: METHODS.GET,
  }, options.timeout);

  post = (path: string, options = {}) => this.request(`${this.endpoint}${path}`, {
    ...options,
    method: METHODS.POST,
  }, options.timeout);

  put = (path: string, options = {}) => this.request(
    `${this.endpoint}${path}`,
    {
      ...options,
      method: METHODS.PUT,
    },
    options.timeout,
  );

  delete = (path: string, options = {}) => this.request(`${this.endpoint}${path}`, {
    ...options,
    method: METHODS.DELETE,
  }, options.timeout);

  request = (url: string, options = {}, timeout = 5000) => {
    const {
      method, data, headers: customHeaders = {}, credentials = false, formData = false,
    } = options;

    const headers = {
      accept: 'application/json',
      ...customHeaders,
    };

    const isGet = method === METHODS.GET;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);
      xhr.timeout = timeout;

      Object.entries(headers).forEach(([key, value]: [string, string]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.withCredentials = credentials;

      xhr.onerror = reject;
      xhr.ontimeout = reject;
      xhr.onabort = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(formData ? data : JSON.stringify(data));
      }
    });
  };
}
