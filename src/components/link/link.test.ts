import { describe, it } from 'mocha';
import { expect } from 'chai';
import { Link } from './link';

describe('Link component', () => {
  it('should be rendered and have text', () => {
    const text = 'Text of link';
    const link = new Link({ link: '/login', text });
    expect(link.element.textContent).to.eq(text);
  });
});
