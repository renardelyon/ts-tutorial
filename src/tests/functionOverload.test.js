import functionOverload from '../functionOverload';

describe('add function', () => {
  it('parameter of number', () => {
    const num = functionOverload(1, 3);
    expect(num).toEqual(expect.any(Number));
  });

  it('parameter of string', () => {
    const str = functionOverload('test', 'is');
    expect(str).toEqual(expect.any(String));
  });
});
