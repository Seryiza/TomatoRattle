import SimpleTimer from './simple';

const timeError = 1000;

test('check 2-seconds timer', (done) => {
  const checkTime = 2 * 1000;
  const startTime = Date.now();

  const minExpectedTime = startTime + checkTime;
  const maxExpectedTime = startTime + checkTime + timeError;

  const timer = new SimpleTimer({
    time: checkTime,
    events: {
      onEnd: () => {
        const currentTime = Date.now();
        expect(currentTime).toBeGreaterThanOrEqual(minExpectedTime);
        expect(currentTime).toBeLessThanOrEqual(maxExpectedTime);
        done();
      },
    },
  });

  timer.start();
});
