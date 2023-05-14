import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import router from './router';

describe('router', () => {
  const step1 = '/messenger';
  const step2 = '/profile';
  const clock = sinon.useFakeTimers();

  it('window.history.length should change after router.go called', () => {
    const path = '/settings';
    const historyLength = window.history.length;
    router.go(path);

    expect(historyLength).to.not.eq(window.history.length);
    expect(window.history.state.pathname).to.eq(path);
  });

  it('window.history.state should be equal to the step 1 after called router.back', () => {
    router.go(step1);
    expect(window.history.state.pathname).to.eq(step1);

    router.go(step2);
    expect(window.history.state.pathname).to.eq(step2);

    router.back();

    clock.tick(100);

    expect(window.history.state.pathname).to.eq(step1);
  });

  it('window.history.state should be equal to the step 2 after called router.forward', () => {
    router.go(step1);
    expect(window.history.state.pathname).to.eq(step1);

    router.go(step2);
    expect(window.history.state.pathname).to.eq(step2);

    router.back();

    clock.tick(100);
    expect(window.history.state.pathname).to.eq(step1);

    clock.tick(100);

    router.forward();

    clock.tick(100);
    expect(window.history.state.pathname).to.eq(step2);

    clock.restore();
  });
});
