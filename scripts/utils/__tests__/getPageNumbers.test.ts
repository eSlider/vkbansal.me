import { getPageNumbers } from '../miscUtils';

const N = null;

describe('getPageNumber tests', () => {
    describe('pages <= total', () => {
        const case1 = [
            [1, 9, [1, 2, 3, 4, 5, 6, 7, 8, 9]],
            [2, 9, [1, 2, 3, 4, 5, 6, 7, 8, 9]],
            [3, 9, [1, 2, 3, 4, 5, 6, 7, 8, 9]],
            [4, 9, [1, 2, 3, 4, 5, 6, 7, 8, 9]],
            [5, 9, [1, 2, 3, 4, 5, 6, 7, 8, 9]],
            [6, 9, [1, 2, 3, 4, 5, 6, 7, 8, 9]],
            [7, 9, [1, 2, 3, 4, 5, 6, 7, 8, 9]],
            [8, 9, [1, 2, 3, 4, 5, 6, 7, 8, 9]],
            [9, 9, [1, 2, 3, 4, 5, 6, 7, 8, 9]]
        ];

        test.each(case1)('current page %i, total pages %i', (currentPage, totalPages, result) => {
            const pages = getPageNumbers(currentPage as number, totalPages as number);
            expect(pages).toEqual(result);
        });
    });

    describe('pages > total', () => {
        /* prettier-ignore */
        const case1 = [
            // index - 0   1   2   3   4   5   6   7   8   9  10
            [ 1, 25, [ 1,  2,  3,  4,  5,  6,  7,  8,  N, 24, 25]],
            [ 2, 25, [ 1,  2,  3,  4,  5,  6,  7,  8,  N, 24, 25]],
            [ 3, 25, [ 1,  2,  3,  4,  5,  6,  7,  8,  N, 24, 25]],
            [ 4, 25, [ 1,  2,  3,  4,  5,  6,  7,  8,  N, 24, 25]],
            [ 5, 25, [ 1,  2,  3,  4,  5,  6,  7,  8,  N, 24, 25]],
            [ 6, 25, [ 1,  2,  3,  4,  5,  6,  7,  8,  N, 24, 25]],
            [ 7, 25, [ 1,  2,  N,  5,  6,  7,  8,  9,  N, 24, 25]],
            [ 8, 25, [ 1,  2,  N,  6,  7,  8,  9, 10,  N, 24, 25]],
            [ 9, 25, [ 1,  2,  N,  7,  8,  9, 10, 11,  N, 24, 25]],
            [10, 25, [ 1,  2,  N,  8,  9, 10, 11, 12,  N, 24, 25]],
            [11, 25, [ 1,  2,  N,  9, 10, 11, 12, 13,  N, 24, 25]],
            [12, 25, [ 1,  2,  N, 10, 11, 12, 13, 14,  N, 24, 25]],
            [13, 25, [ 1,  2,  N, 11, 12, 13, 14, 15,  N, 24, 25]],
            [14, 25, [ 1,  2,  N, 12, 13, 14, 15, 16,  N, 24, 25]],
            [15, 25, [ 1,  2,  N, 13, 14, 15, 16, 17,  N, 24, 25]],
            [16, 25, [ 1,  2,  N, 14, 15, 16, 17, 18,  N, 24, 25]],
            [17, 25, [ 1,  2,  N, 15, 16, 17, 18, 19,  N, 24, 25]],
            [18, 25, [ 1,  2,  N, 16, 17, 18, 19, 20,  N, 24, 25]],
            [19, 25, [ 1,  2,  N, 17, 18, 19, 20, 21,  N, 24, 25]],
            [20, 25, [ 1,  2,  N, 18, 19, 20, 21, 22, 23, 24, 25]],
            [21, 25, [ 1,  2,  N, 18, 19, 20, 21, 22, 23, 24, 25]],
            [22, 25, [ 1,  2,  N, 18, 19, 20, 21, 22, 23, 24, 25]],
            [23, 25, [ 1,  2,  N, 18, 19, 20, 21, 22, 23, 24, 25]],
            [24, 25, [ 1,  2,  N, 18, 19, 20, 21, 22, 23, 24, 25]],
            [25, 25, [ 1,  2,  N, 18, 19, 20, 21, 22, 23, 24, 25]]
        ];

        test.each(case1)('current page %i, total pages %i', (currentPage, totalPages, result) => {
            const pages = getPageNumbers(currentPage as number, totalPages as number);
            expect(pages).toEqual(result);
        });

        /* prettier-ignore */
        const case2 = [
            // index - 0   1   2   3   4   5   6   7   8   9  10  11  12  13  14
            [ 1, 25, [ 1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11,  N, 23, 24, 25]],
            [ 2, 25, [ 1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11,  N, 23, 24, 25]],
            [ 3, 25, [ 1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11,  N, 23, 24, 25]],
            [ 4, 25, [ 1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11,  N, 23, 24, 25]],
            [ 5, 25, [ 1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11,  N, 23, 24, 25]],
            [ 6, 25, [ 1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11,  N, 23, 24, 25]],
            [ 7, 25, [ 1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11,  N, 23, 24, 25]],
            [ 8, 25, [ 1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11,  N, 23, 24, 25]],
            [ 9, 25, [ 1,  2,  3,  N,  6,  7,  8,  9, 10, 11, 12,  N, 23, 24, 25]],
            [10, 25, [ 1,  2,  3,  N,  7,  8,  9, 10, 11, 12, 13,  N, 23, 24, 25]],
            [11, 25, [ 1,  2,  3,  N,  8,  9, 10, 11, 12, 13, 14,  N, 23, 24, 25]],
            [12, 25, [ 1,  2,  3,  N,  9, 10, 11, 12, 13, 14, 15,  N, 23, 24, 25]],
            [13, 25, [ 1,  2,  3,  N, 10, 11, 12, 13, 14, 15, 16,  N, 23, 24, 25]],
            [14, 25, [ 1,  2,  3,  N, 11, 12, 13, 14, 15, 16, 17,  N, 23, 24, 25]],
            [15, 25, [ 1,  2,  3,  N, 12, 13, 14, 15, 16, 17, 18,  N, 23, 24, 25]],
            [16, 25, [ 1,  2,  3,  N, 13, 14, 15, 16, 17, 18, 19,  N, 23, 24, 25]],
            [17, 25, [ 1,  2,  3,  N, 14, 15, 16, 17, 18, 19, 20,  N, 23, 24, 25]],
            [18, 25, [ 1,  2,  3,  N, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]],
            [19, 25, [ 1,  2,  3,  N, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]],
            [20, 25, [ 1,  2,  3,  N, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]],
            [21, 25, [ 1,  2,  3,  N, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]],
            [22, 25, [ 1,  2,  3,  N, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]],
            [23, 25, [ 1,  2,  3,  N, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]],
            [24, 25, [ 1,  2,  3,  N, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]],
            [25, 25, [ 1,  2,  3,  N, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]]
        ];

        test.each(case2)(
            'current page %i, total pages %i, primaryGroup 7, secondaryGroup 3',
            (currentPage, totalPages, result) => {
                const pages = getPageNumbers(currentPage as number, totalPages as number, 7, 3);
                expect(pages).toEqual(result);
            }
        );
    });
});
