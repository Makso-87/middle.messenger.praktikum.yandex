import { describe, it } from 'mocha';
import { expect } from 'chai';
import { getType } from '../getType';

describe('myDash getType', () => {
  it('should be type String', () => {
    const result = getType('test');
    expect(result).to.eq('String');
  });

  it('should be type Number', () => {
    const result = getType(10);
    expect(result).to.eq('Number');
  });

  it('should be type Boolean', () => {
    const result = getType(true);
    expect(result).to.eq('Boolean');
  });

  it('should be type Object', () => {
    const result = getType({ a: 'b' });
    expect(result).to.eq('Object');
  });

  it('should be type Array', () => {
    const result = getType([{ a: 'b' }]);
    expect(result).to.eq('Array');
  });

  it('should be type Function', () => {
    const result = getType(() => {});
    expect(result).to.eq('Function');
  });

  it('should be type Map', () => {
    const result = getType(new Map());
    expect(result).to.eq('Map');
  });

  it('should be type Set', () => {
    const result = getType(new Set());
    expect(result).to.eq('Set');
  });

  it('should be type Null', () => {
    const result = getType(null);
    expect(result).to.eq('Null');
  });

  it('should be type Undefined', () => {
    const result = getType(undefined);
    expect(result).to.eq('Undefined');
  });
});
