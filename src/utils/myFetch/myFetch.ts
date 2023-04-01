const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const queryStringify = (data) => {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const dataArray = Object.entries(data);
  return dataArray.reduce((acc, [key, value], index) => `${acc}${key}=${value}${dataArray.length - 1 !== index ? '&' : ''}`, '?');
};

export default class MyFetch {
  get = (url, options = {}) => this.request(url, {
    ...options,
    method: METHODS.GET,
  }, options.timeout);

  post = (url, options = {}) => this.request(url, {
    ...options,
    method: METHODS.POST,
  }, options.timeout);

  put = (url, options = {}) => this.request(
    url,
    {
      ...options,
      method: METHODS.PUT,
    },
    options.timeout,
  );

  delete = (url, options = {}) => this.request(url, {
    ...options,
    method: METHODS.DELETE,
  }, options.timeout);

  request = (url, options, timeout = 5000) => {
    const { method, data, headers } = options;

    const isGet = method === METHODS.GET;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);
      xhr.timeout = timeout;

      if (headers) {
        Object.entries(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      }

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onerror = reject;
      xhr.ontimeout = reject;
      xhr.onabort = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
