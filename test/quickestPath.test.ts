import { quickestPath } from "../src/quickestPath"

describe("quickestPath function", () => {

    const ladders: [number, number][] = [ [3, 39], [14, 35], [31, 70], [44, 65], [47, 86], [63, 83], [71, 93] ];
    const snakes:  [number, number][] = [ [21, 4], [30, 8],  [55, 38], [79, 42], [87, 54], [91, 48], [96, 66] ];
    const cases : number[][] = [
        [ 2, 5, 6, 5, 2],
        [ 2, 5, 6, 2, 5],
        [ 2, 5, 6, 6, 1],
        [ 2, 5, 6, 1, 6], 
        [ 2, 5, 6, 3, 4], 
        [ 2, 5, 6, 4, 3]
    ];

    test(`quickestPath should be matched cases`, () => {
        const result: number[] = quickestPath({ladders , snakes})
        const findResult = cases.some((value) => JSON.stringify(value) == JSON.stringify(result))
        expect(findResult).toEqual(true)
    })

});