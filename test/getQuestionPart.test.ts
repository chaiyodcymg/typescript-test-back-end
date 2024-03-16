import { getQuestionPart } from "../src/getQuestionPart"

describe("getQuestionPart function", () => {

    type Case = {
        phrases: string[];
        expected: string[];
    }

    const cases : Case[] = [
        {
            phrases:  ["BATHROOM", "BATH SALTS", "BLOODBATH"],
            expected: ["ROOM", "SALTS", "BLOOD"]
        },
        {
            phrases:  ["BEFRIEND", "GIRLFRIEND", "FRIENDSHIP"],
            expected: ["BE", "GIRL", "SHIP"]
        }
    ];

    test.each(cases)(`getQuestionPart should be matched cases`, ({ phrases , expected}) => {
        const result: string[] = getQuestionPart(phrases);
        expect(result).toEqual(expected);
    })

});