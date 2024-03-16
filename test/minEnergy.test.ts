import { minEnergy } from "../src/minEnergy";



describe("minEnergy function", () => {

    const cases : {
        start: number,
        shops: number[],
        stations: number[],
        target: number,
        expected: number
    }[] = [
        {
            start: 0,
            shops: [4, 9],
            stations:[3, 6, 8],
            target: 11,
            expected: 8
        },
        {
            start: 0,
            shops: [9, 4],
            stations:[8, 6, 3],
            target: 11,
            expected: 8
        },
        {
            start: 1,
            shops: [4, 9],
            stations:[3, 6, 8],
            target: 11,
            expected: 7
        },
        {
            start: 0,
            shops: [2, 9],
            stations:[3, 6, 8],
            target: 11,
            expected: 6
        },
        {
            start: 0,
            shops: [2, 9],
            stations:[3, 6, 8],
            target: 12,
            expected: 7
        },
        {
            start: 0,
            shops: [4, 9],
            stations:[3, 6, 11],
            target: 11,
            expected: 9
        },
        {
            start: 0,
            shops: [2, 9, 10],
            stations:[3, 6, 11],
            target: 11,
            expected: 7
        },
    ]

    test(`minEnergy should be matched cases`, () => {
        const expectedCount: number = cases.length;
        let count: number = 0;
        cases.forEach(({ start, shops, stations, target, expected }) => {
            const result: number = minEnergy(start, shops, stations, target);
            count += result === expected ? 1 : 0;
        });
        expect(count === expectedCount).toEqual(true);
    })
 
});