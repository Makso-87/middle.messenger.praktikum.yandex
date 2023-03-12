/*
	* range(4); // => [0, 1, 2, 3]
	* range(-4); // => [0, -1, -2, -3]
	* range(1, 5); // => [1, 2, 3, 4]
	* range(0, 20, 5); // => [0, 5, 10, 15]
	* range(0, -4, -1); // => [0, -1, -2, -3]
	* range(1, 4, 0); // => [1, 1, 1]
	* range(0); // => []
*/

export function range(start = 0, end, step = 1, isRight = false) {
  end = end ? end : start;
  start = end === start ? 0 : start;
  step = end < 0 && step > 0 ? step * -1 : step;

  let counter = start;
  const range = [];

  while (Math.abs(counter) < Math.abs(end)) {
    if(step === 0) {
		counter += 1;
		range.push(start);
		continue;
	}

	range.push(counter);
	counter += step;
  }

  return isRight ? range.reverse() : range;
}
