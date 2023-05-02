import { vtMock1, vtMock2 } from 'vittest-dependency';

describe('depedencies', () => {
  it('works with imported package that also is in "devDependencies"', async () => {
    // supposed to print 'mocking' but doesn't
    vtMock1();
    const m1 = await import('uuid');
    expect(m1.v4()).toEqual('uuid');
  });
  it('works with imported package that is not in "devDependencies"', async () => {
    // supposed to print 'uuid' string but prints a real one
    // prints
    vtMock2();
    const m2 = await import('1something1');
    expect(m2.something).toEqual(true);
  });
  it('works with imported package that is in "devDependencies" and is mocked directly here', async () => {
    vi.doMock('uuid', () => {
      console.log('mocking3');
      return {
        v4: () => 'uuid'
      }
    });
    // supposed to print 'uuid' string and prints it
    const m3 = await import('uuid');
    expect(m3.v4()).toEqual('uuid');
  });
});