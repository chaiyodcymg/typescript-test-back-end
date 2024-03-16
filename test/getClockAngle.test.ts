
import { getClockAngle } from "../src/getClockAngle"


describe("getClockAngle function", () => {

    type Case = {
        hh_mm: string;
        expected: number;
    }

    const cases : Case[] = [
        {
            hh_mm: "09:00",
            expected: 90
        },
        {
            hh_mm: "17:30",
            expected: 15
        },
        {
            hh_mm: "12:00",
            expected: 0
        },
        {
            hh_mm: "18:00",
            expected: 180
        },
        {
            hh_mm: "20:15",
            expected: 157.5
        },
        {
            hh_mm: "00:00",
            expected: 0
        }
    ];

    test.each(cases)(`getClockAngle should be matched cases`, ({ hh_mm , expected}) => {
        const result = getClockAngle(hh_mm);
        expect(result).toEqual(expected);
    })

});