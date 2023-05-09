import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import { NavLink } from './navLink';
import Router from '../../utils/router/router';

describe('NavLink component', () => {
  it('should be rendered and have text', () => {
    const text = 'Text of link';
    const link = new NavLink({ link: '/login', text });
    expect(link.element.textContent).to.eq(text);
  });

  it('should be called method "go" of the router', () => {
    const text = 'Text of link';
    const link = '/login';
    const callback = sinon.stub();
    // @ts-ignore
    const router = { go: callback } as typeof Router;
    const navLink = new NavLink({ link, text });

    navLink.setProps({
      events: {
        click: (event) => {
          event.preventDefault();
          router.go(link);
        },
      },
    });

    navLink.element?.click();

    expect(callback.calledOnceWith(link));
  });
});
