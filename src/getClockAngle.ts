
export const getClockAngle = (hh_mm: string): number => {
    const [ hour , minute ]: string [] = hh_mm.split(":");
    let hourNumber: number = parseInt(hour);
    hourNumber = hourNumber > 12 ? hourNumber - 12 : hourNumber;
    const minuteNumber: number = parseInt(minute);
    const minuteNumberFordivide: number = minuteNumber == 0 ? 60 : minuteNumber;
    const divide: number = minuteNumberFordivide / 60  == 1 ? 0 : minuteNumberFordivide / 60;
    let hourhand: number = (hourNumber + divide) * 360 / 12;
    hourhand = hourhand >= 360 ? hourhand - 360 : hourhand;
    const minutehand: number = minuteNumber == 0 ? ((60 * 12) / 60) * 360 / 12 : ((minuteNumber * 12) / 60) * 360 / 12 + 360;
    const result: number =  hourhand > minutehand ? hourhand - minutehand : minutehand - hourhand;
    return result > 180 ? Math.abs(360 - result) : result;
}

 