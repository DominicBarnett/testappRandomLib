const fb = require("@cabbagesoup/random-lib");

describe('random', () => {
  test('should return a number between 0 and 1', () => {
    const result = fb.random();  // Adjusted to use fb.random()

    // Check that the result is a number
    expect(typeof result).toBe('number');

    // Check that the number is between 0 and 1
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(1);
  });

  test('should return different numbers for multiple calls', () => {
    const result1 = fb.random();  // Adjusted to use fb.random()
    const result2 = fb.random();  // Adjusted to use fb.random()

    // It's very unlikely that two calls would return exactly the same number
    expect(result1).not.toBe(result2);
  });
});

describe('random(n)', () => {
    test('should return a number between 0 and n', () => {
      const n = 10;
      const result = fb.randomN(n);  // Using fb.random(n) now
  
      // Check that the result is a number
      expect(typeof result).toBe('number');
  
      // Check that the number is between 0 and n
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(n);
    });
  
    test('should return different numbers for multiple calls', () => {
      const n = 10;
      const result1 = fb.randomN(n);  // First call
      const result2 = fb.randomN(n);  // Second call
  
      // It's very unlikely that two calls would return exactly the same number
      expect(result1).not.toBe(result2);
    });
  
    test('should return 0 when n is 0', () => {
      const result = fb.randomN(0);  // Testing for n = 0
  
      // Should always return 0 when n is 0
      expect(result).toBe(0);
    });
  });

describe('random(n, o)', () => {
    test('should return a number between n and o (inclusive)', () => {
      const n = 5;
      const o = 10;
      const result = fb.randomNtoO(n, o);  // Using fb.random(n, o)
  
      // Check that the result is a number
      expect(typeof result).toBe('number');
  
      // Check that the number is between n and o (inclusive)
      expect(result).toBeGreaterThanOrEqual(n);
      expect(result).toBeLessThanOrEqual(o);
    });
  
    test('should return different numbers for multiple calls', () => {
      const n = 5;
      const o = 10;
      const result1 = fb.randomNtoO(n, o);  // First call
      const result2 = fb.randomNtoO(n, o);  // Second call
  
      // It's very unlikely that two calls would return exactly the same number
      expect(result1).not.toBe(result2);
    });
  
    test('should return n when n and o are the same', () => {
      const n = 7;
      const o = 7;
      const result = fb.randomNtoO(n, o);  // n and o are equal
  
      // Should always return n when n and o are the same
      expect(result).toBe(n);
    });
  
    test('should handle negative numbers correctly', () => {
      const n = -5;
      const o = -1;
      const result = fb.randomNtoO(n, o);  // Test with negative numbers
  
      // Check that the result is between n and o (inclusive)
      expect(result).toBeGreaterThanOrEqual(n);
      expect(result).toBeLessThanOrEqual(o);
    });
  });

describe('die(x)', () => {
    test('should generate numbers between 1 and x (inclusive)', () => {
      const x = 6;
      const results = Array.from({ length: 1000 }, () => fb.die(x));
      
      // Check that all results are within the expected range
      expect(results.every(result => result >= 1 && result <= x)).toBe(true);
    });
  
    test('should handle edge case when x is 1', () => {
      const x = 1;
      const results = Array.from({ length: 1000 }, () => fb.die(x));
      
      // Check that all results are exactly 1
      expect(results.every(result => result === 1)).toBe(true);
    });
  
    test('should throw an error when x is 0', () => {
      expect(() => fb.die(0)).toThrow("x must be greater than 0");
    });
  
    test('should throw an error when x is negative', () => {
      expect(() => fb.die(-1)).toThrow("x must be greater than 0");
    });
  });

describe('shuffle(arr)', () => {
    test('should return a shuffled copy of the array', () => {
      const arr = [1, 2, 3, 4, 5];
      const result = fb.shuffle(arr);
  
      // Check that the result is a different array instance
      expect(result).not.toBe(arr);
      
      // Check that the result is a permutation of the input array
      const isPermutation = result.length === arr.length &&
                            result.every(item => arr.includes(item)) &&
                            arr.every(item => result.includes(item));
      expect(isPermutation).toBe(true);
    });
  
    test('should not modify the original array', () => {
      const arr = [1, 2, 3, 4, 5];
      const arrCopy = arr.slice(); // Make a copy of the original array
      fb.shuffle(arr);
      expect(arr).toEqual(arrCopy); // Ensure the original array is unchanged
    });
  
    test('should handle an empty array', () => {
      const arr = [];
      const result = fb.shuffle(arr);
      expect(result).toEqual([]); // An empty array should remain empty
    });
  
    test('should handle an array with a single element', () => {
      const arr = [1];
      const result = fb.shuffle(arr);
      expect(result).toEqual([1]); // A single-element array should remain unchanged
    });
  
    test('should handle an array with duplicate elements', () => {
      const arr = [1, 1, 2, 2, 3, 3];
      const result = fb.shuffle(arr);
      
      // Check that the result is a permutation of the input array
      const isPermutation = result.length === arr.length &&
                            result.every(item => arr.includes(item)) &&
                            arr.every(item => result.includes(item));
      expect(isPermutation).toBe(true);
    });
  });

describe('flip(t)', () => {
    test('should return a boolean value', () => {
      const result = fb.flip();
      
      // Check that the result is either true or false
      expect(typeof result).toBe('boolean');
    });
  
    test('should return true approximately 50% of the time when t = 0.5', () => {
      const trials = 10000;
      const results = Array.from({ length: trials }, () => fb.flip(0.5));
      
      // Count the number of true values
      const trueCount = results.filter(result => result === true).length;
      
      // Check that the number of true values is approximately half the trials (with some tolerance)
      expect(trueCount / trials).toBeGreaterThanOrEqual(0.45);
      expect(trueCount / trials).toBeLessThanOrEqual(0.55);
    });
  
    test('should return true almost all the time when t = 1', () => {
      const trials = 1000;
      const results = Array.from({ length: trials }, () => fb.flip(1));
      
      // Check that all values are true when t = 1
      expect(results.every(result => result === true)).toBe(true);
    });
  
    test('should return false almost all the time when t = 0', () => {
      const trials = 1000;
      const results = Array.from({ length: trials }, () => fb.flip(0));
      
      // Check that all values are false when t = 0
      expect(results.every(result => result === false)).toBe(true);
    });
  
    test('should return true approximately 30% of the time when t = 0.3', () => {
      const trials = 10000;
      const results = Array.from({ length: trials }, () => fb.flip(0.3));
      
      // Count the number of true values
      const trueCount = results.filter(result => result === true).length;
      
      // Check that the number of true values is approximately 30% of the trials (with some tolerance)
      expect(trueCount / trials).toBeGreaterThanOrEqual(0.25);
      expect(trueCount / trials).toBeLessThanOrEqual(0.35);
    });
  
    test('should handle edge cases where t is outside the range [0, 1]', () => {
      // Assuming the function handles invalid t by either clamping or throwing an error
      expect(() => fb.flip(-0.5)).toThrow();  // If function throws error for invalid t
      expect(() => fb.flip(1.5)).toThrow();   // Adjust based on your expected behavior
    });
  });

 describe('dieRoll', () => {
  
    test('should roll a single die, e.g., d6', () => {
      const result = fb.dieRoll('d6');
      
      // Check that the result is between 1 and 6
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(6);
    });
  
    test('should roll multiple dice of the same type, e.g., 3d6', () => {
      const result = fb.dieRoll('3d6');
      
      // Check that the result is between 3 and 18 (since each d6 gives a result between 1 and 6)
      expect(result).toBeGreaterThanOrEqual(3);
      expect(result).toBeLessThanOrEqual(18);
    });
  
    test('should handle mixed dice, e.g., 2d6+1d4', () => {
      const result = fb.dieRoll('2d6+1d4');
      
      // The result should be between 3 (2 * 1 from 2d6 + 1 from 1d4) and 16 (2 * 6 from 2d6 + 4 from 1d4)
      expect(result).toBeGreaterThanOrEqual(3);
      expect(result).toBeLessThanOrEqual(16);
    });
  
    test('should add a static value, e.g., 1d8+2', () => {
      const result = fb.dieRoll('1d8+2');
      
      // The result should be between 3 (1 from d8 + 2) and 10 (8 from d8 + 2)
      expect(result).toBeGreaterThanOrEqual(3);
      expect(result).toBeLessThanOrEqual(10);
    });
  
    test('should handle no dice rolls, just a static value', () => {
      const result = fb.dieRoll('2');
      
      // The result should just be the static value
      expect(result).toBe(2);
    });
  
    test('should handle complex cases, e.g., 3d6+2d4+5', () => {
      const result = fb.dieRoll('3d6+2d4+5');
      
      // The result should be between 10 (3*1 from 3d6 + 2*1 from 2d4 + 5) and 31 (3*6 from 3d6 + 2*4 from 2d4 + 5)
      expect(result).toBeGreaterThanOrEqual(10);
      expect(result).toBeLessThanOrEqual(31);
    });
    
  });