export const numberInput = {
  cast: x => Number(x),
};

const millisecondsInMinute = 60 * 1000;
export const minutesFromMillisecondsInput = {
  cast: x => Number(x),
  input: x => x * millisecondsInMinute,
  output: x => x / millisecondsInMinute,
};

export const booleanFromStringInput = {
  cast: x => String(x) === 'true',
};
