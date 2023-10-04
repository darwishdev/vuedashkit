import { afterEach, describe, expect, test, vi } from 'vitest'
import { RouteQueryAppend, RouteQueryRemove } from './query'; // Replace with the actual module path

const mockHistory: History = {
    state: { current: '/test' },
    pushState: vi.fn(),
    length: 0,
    scrollRestoration: 'auto',
    back: function (): void {
        throw new Error('Function not implemented.');
    },
    forward: function (): void {
        throw new Error('Function not implemented.');
    },
    go: function (delta?: number | undefined): void {
        throw new Error('Function not implemented.');
    },
    replaceState: function (data: any, unused: string, url?: string | URL | null | undefined): void {
        throw new Error('Function not implemented.');
    }
};
global.history = mockHistory;
describe('RouteQueryAppend', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })
    test('should add a new query parameter to the URL when router has no params', () => {
        RouteQueryAppend('param1', 'value1');
        const expectedParams = '/test?param1=value1';

        expect(mockHistory.pushState).toHaveBeenCalledWith(
            { current: expectedParams },
            '',
            expectedParams
        );
    });

    test('should override an existing query parameter on the URL', () => {
        // Set an initial query parameter
        global.history.state.current = "/test?param1=value1"


        // Now, override it with a new value
        RouteQueryAppend('param1', 'value2');
        const expectedParams = '/test?param1=value2';
        expect(mockHistory.pushState).toHaveBeenCalledWith(
            { current: expectedParams },
            '',
            expectedParams
        );
    });

    test('should add a new query parameter to the URL when router has existing params', () => {
        // Set an initial query parameter
        global.history.state.current = "/test?param1=value1"
        // Add a new parameter
        RouteQueryAppend('param2', 'value2');
        const expectedParams = '/test?param1=value1&param2=value2';

        expect(mockHistory.pushState).toHaveBeenCalledWith(
            { current: expectedParams },
            '',
            expectedParams
        );
    });
});



///////////////////
describe('RouteQueryRemove', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })
    test('should remove passed key', () => {
        global.history.state.current = "/test?param1=value1"
        const params = RouteQueryRemove('param1');


        console.log(params)
        const expectedParams = '/test?';

        expect(mockHistory.pushState).toHaveBeenCalledWith({ current: expectedParams },
            '',
            expectedParams)
        expect(mockHistory.pushState).toHaveBeenCalledOnce()
    });

    test('should do nothing if passed un defined key', () => {
        // Set an initial query parameter
        global.history.state.current = "/test?param1=value1"
        // Now, override it with a new value
        const expectedParams = '/test?param1=value1';
        RouteQueryRemove('param2');
        // expect(mockHistory.pushState).toHaveBeenCalledWith({ current: expectedParams },
        //     '',
        //     expectedParams)
        expect(mockHistory.pushState).toHaveBeenCalledOnce()

    });
});

