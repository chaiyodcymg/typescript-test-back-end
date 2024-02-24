"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getClockAngle_1 = require("../src/getClockAngle");
describe("getClockAngle function", () => {
    const cases = [
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
    test.each(cases)(`getClockAngle(%s) should be %s`, ({ hh_mm, expected }) => {
        const result = (0, getClockAngle_1.getClockAngle)(hh_mm);
        expect(result).toEqual(expected);
    });
});
//# sourceMappingURL=getClockAngle.test.js.map