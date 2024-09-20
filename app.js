// src/index.ts

import { random, randomN, randomNtoO, die, shuffle, flip, dieRoll } from '@cabbagesoup/random-lib';

// Test random function
console.log('Random number between 0 and 1:', random());

// Test randomN function
console.log('Random number between 0 and 10:', randomN(10));

// Test randomNtoO function
console.log('Random number between 5 and 15:', randomNtoO(5, 15));

// Test die function
console.log('Rolling a 6-sided die:', die(6));

// Test shuffle function
console.log('Shuffled array:', shuffle([1, 2, 3, 4, 5]));

// Test flip function
console.log('Coin flip result with 50% probability:', flip(0.5));

// Test dieRoll function
console.log('Die roll result for "2d6+1":', dieRoll('2d6+1'));
