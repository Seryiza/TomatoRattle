import ObjectBasedStorage from './objectBased';

test('check has-set-get', () => {
  const startObject = {
    hello: 'world',
  };

  const storage = new ObjectBasedStorage(startObject);

  expect(storage.has('hello')).toBeTruthy();
  expect(storage.has('world')).toBeFalsy();

  storage.set('world', 'hello');
  expect(storage.has('world')).toBeTruthy();

  const world = storage.get('world');
  expect(world).toBe('hello');
});
