import { describe, it, afterEach } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import MyFetch from './myFetch';

describe('myFetch', () => {
  const requests: sinon.SinonFakeXMLHttpRequest[] = [];
  const XHR = sinon.useFakeXMLHttpRequest();

  // @ts-ignore
  global.XMLHttpRequest = XHR;

  XHR.onCreate = (xhr) => {
    requests.push(xhr);
  };

  afterEach(() => {
    requests.length = 0;
  });

  it('should call xhr with GET method if Get called', () => {
    const fetch = new MyFetch('/auth');

    fetch.get();

    expect(requests[0].method).to.eq('GET');
  });

  it('should call xhr with POST method if Get called', () => {
    const fetch = new MyFetch('/auth');
    // @ts-ignore
    fetch.post('/login', { data: { login: 'test' } });

    expect(requests[0].method).to.eq('POST');
  });
});
