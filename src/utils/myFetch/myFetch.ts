import { queryStringify } from '../mydash/stringifyQuery';
import { PlainObject } from '../mydash/isPlainObject';
// import { PlainObject } from '../mydash/isPlainObject';

const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

interface Options {
  headers?: object;
  method?: string;
  data?: PlainObject | FormData;
  credentials?: boolean;
  formData?: boolean;
  timeout?: number;
}

type FetchType = (path?: string, options?: Options) => Promise<unknown>;

const isFormData = (value: unknown): value is FormData => typeof value === FormData;

export default class MyFetch {
  static API_URL = 'https://ya-praktikum.tech/api/v2';

  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${MyFetch.API_URL}${endpoint}`;
  }

  get: FetchType = (path = '', options = {}) => this.request(`${this.endpoint}${path}`, {
    ...options,
    method: METHODS.GET,
  }, options.timeout);

  post: FetchType = (path, options = {}) => this.request(`${this.endpoint}${path}`, {
    ...options,
    method: METHODS.POST,
  }, options.timeout);

  put: FetchType = (path, options = {}) => this.request(
    `${this.endpoint}${path}`,
    {
      ...options,
      method: METHODS.PUT,
    },
    options.timeout,
  );

  delete: FetchType = (path, options = {}) => this.request(`${this.endpoint}${path}`, {
    ...options,
    method: METHODS.DELETE,
  }, options.timeout);

  request = (url: string, options = {}, timeout = 5000) => {
    const {
      method, data, headers: customHeaders = {}, credentials = false, formData = false,
    }: Options = options;

    const headers = {
      accept: 'application/json',
      // 'Content-Security-Policy': 'default-src self; img-src self; script-src self; object-src none; style-src self; frame-ancestors self; base-uri self; form-action self; media-src https://ya-praktikum.tech/api/v2/resources;',
      // 'X-Content-Type-Options': 'nosniff',
      // 'X-Frame-Options': 'deny',
      // 'Access-Control-Allow-Origin': 'https://ya-praktikum.tech',
      // 'X-XSS-Protection': '1; mode=block',
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
        xhr.send(typeof data === FormData ? data : JSON.stringify(data));
      }
    });
  };
}
