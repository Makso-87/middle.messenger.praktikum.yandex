import { describe, it } from 'mocha';
import { expect } from 'chai';
import { set } from '../set';
import { Indexed } from '../merge';

describe('myDash set', () => {
  const object: Indexed = { a: 'b' };
  it('should throw error if path is not string', () => {
    // @ts-ignore
    const func = () => set(object, null, { a: 'd' });
    expect(func).to.throw(Error);
  });

  it('should return same value (null) if to first arg passed not object', () => {
    const notObj: null = null;
    const result = set(notObj, 'a.b', { a: 'd' });
    expect(result).to.eq(notObj);
  });

  it('should return same value (string) if to first arg passed not object', () => {
    const notObj = '';
    // @ts-ignore
    const result = set(notObj, 'a.b', { a: 'd' });
    expect(result).to.eq(notObj);
  });

  it('should return same value (array) if to first arg passed not object', () => {
    const notObj: [] = [];
    // @ts-ignore
    const result = set(notObj, 'a.b', { a: 'd' });
    expect(result).to.eq(notObj);
  });

  it('should return updated object', () => {
    const result = set(object, 'b', 'd');
    expect(result).to.have.property('a').with.a('string', 'b');
    expect(result).to.have.property('b').with.a('string', 'd');
  });
});
