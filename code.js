var input = 'msdhoni';

var result = input
    .split('')
    .filter((value) => value !== ' ')
    .join('+');

console.log(result);
