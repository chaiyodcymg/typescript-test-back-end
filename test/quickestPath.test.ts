import { quickestPath } from "../src/quickestPath"

describe("quickestPath function", () => {

    const laddersDefault: [number, number][] = [ [3, 39], [14, 35], [31, 70], [44, 65], [47, 86], [63, 83], [71, 93] ];
    const snakesDefault:  [number, number][] = [ [21, 4], [30, 8],  [55, 38], [79, 42], [87, 54], [91, 48], [96, 66] ];
    const laddersNotSort: [number, number][] = [ [47, 86], [14, 35],[3, 39], [31, 70], [71, 93], [44, 65],  [63, 83] ];
    const snakesNotSort:  [number, number][] = [ [30, 8], [96, 66], [55, 38], [79, 42], [91, 48], [21, 4],  [87, 54] ];
    const laddersOtherBoard: [number, number][] = [ [12, 39], [14, 35], [31, 70], [46, 65], [49, 86], [63, 83], [71, 98] ];
    const snakesOtherBoard:  [number, number][] = [ [21, 4], [30, 8],  [45, 38], [79, 42], [87, 54], [91, 48], [96, 66] ];

    const casesDefault : number[][] = [
        [ 2, 5, 6, 5, 2],
        [ 2, 5, 6, 2, 5],
        [ 2, 5, 6, 6, 1],
        [ 2, 5, 6, 1, 6], 
        [ 2, 5, 6, 4, 3]
    ];

    const casesOtherBoard : number[][] = [
        [ 6, 5, 5, 2, 6, 2 ],
        [ 6, 5, 2, 5, 6, 2 ],
        [ 6, 5, 4, 3, 6, 2 ],
        [ 6, 5, 3, 4, 6, 2 ],
        [ 5, 6, 5, 2, 6, 2 ],
        [ 5, 6, 2, 5, 6, 2 ],
        [ 5, 6, 4, 3, 6, 2 ],
        [ 5, 6, 3, 4, 6, 2 ],     
    ];

    test(`quickestPath should be matched cases ladders and snakes are default`, () => {
        const result: number[] = quickestPath({ladders: laddersDefault , snakes: snakesDefault})
        const findResult = casesDefault.some((value) => JSON.stringify(value) == JSON.stringify(result))
        expect(findResult).toEqual(true)
    })

    test(`quickestPath should be matched cases ladders and snakes are not sort`, () => {
        const result: number[] = quickestPath({ladders: laddersNotSort , snakes: snakesNotSort})
        const findResult = casesDefault.some((value) => JSON.stringify(value) == JSON.stringify(result))
        expect(findResult).toEqual(true)
    })

    test(`quickestPath should be matched cases ladders and snakes are other boards`, () => {
        const result: number[] = quickestPath({ladders: laddersOtherBoard , snakes: snakesOtherBoard})
        const findResult = casesOtherBoard.some((value) => JSON.stringify(value) == JSON.stringify(result))
        expect(findResult).toEqual(true)
    })
});