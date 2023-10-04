import { afterEach, it, beforeEach, describe, expect, test, vi } from 'vitest'
import { Debounce } from './debounce'; // Replace with the actual module path

describe('debounce function', () => {
    let fn;
    let debouncedFunction;
    vi.useFakeTimers();

    beforeEach(() => {
        fn = vi.fn();
        debouncedFunction = Debounce(fn, 500);
    });

    afterEach(() => {
        vi.clearAllTimers();
    });

    it('executes the latest call after delay', () => {
        debouncedFunction(1);
        debouncedFunction(2);
        debouncedFunction(3);

        // Advance the timer by 500 milliseconds
        vi.advanceTimersByTime(500);

        expect(fn).toHaveBeenCalledTimes(1);
        expect(fn).toHaveBeenCalledWith(3);
    });

    it('cancels previous calls', () => {
        debouncedFunction(1);
        debouncedFunction(2);

        // Advance the timer by 200 milliseconds (before the debounce delay)
        vi.advanceTimersByTime(200);

        debouncedFunction(3);

        // Advance the timer by 500 milliseconds
        vi.advanceTimersByTime(500);

        expect(fn).toHaveBeenCalledTimes(1);
        expect(fn).toHaveBeenCalledWith(3);
    });
});