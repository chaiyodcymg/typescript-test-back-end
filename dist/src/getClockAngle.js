"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClockAngle = void 0;
const getClockAngle = (hh_mm) => {
    const [hour, minute] = hh_mm.split(":");
    let hourNumber = parseInt(hour);
    hourNumber = hourNumber > 12 ? hourNumber - 12 : hourNumber;
    const minuteNumber = parseInt(minute);
    const minuteNumberFordivide = minuteNumber == 0 ? 60 : minuteNumber;
    const divide = minuteNumberFordivide / 60 == 1 ? 0 : minuteNumberFordivide / 60;
    let hourhand = (hourNumber + divide) * 360 / 12;
    hourhand = hourhand >= 360 ? hourhand - 360 : hourhand;
    const minutehand = minuteNumber == 0 ? ((60 * 12) / 60) * 360 / 12 : ((minuteNumber * 12) / 60) * 360 / 12 + 360;
    const result = hourhand > minutehand ? hourhand - minutehand : minutehand - hourhand;
    return result > 180 ? Math.abs(360 - result) : result;
};
exports.getClockAngle = getClockAngle;
console.log((0, exports.getClockAngle)("00:00"));
//# sourceMappingURL=getClockAngle.js.map