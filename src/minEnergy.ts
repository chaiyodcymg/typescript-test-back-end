
export const minEnergy = (start: number, shops: number[], stations: number[], target: number): number => {
    shops = shops.sort((a, b) => a - b);
    stations = stations.sort((a, b) => a - b);
    let current: number = start;
    let energy: number = 0;
    let shopsVisited: number[] = [];
    let bus: number = 0;
    let walk: number = 0;
    while(current < target){
        const nearestShop: number = findNearestShopsByCurrent(current, shops, shopsVisited);
        const { prevStation , frStation } : { prevStation: number , frStation: number } = findPrevNearestStationsByCurrent(current, stations, start, nearestShop); 
        const { nextStation , farestStation } : { nextStation: number , farestStation: number } = findNextNearestStationsByCurrent(current, stations, nearestShop);
        walk = nearestShop > 0 ? nearestShop - current : target - current;     
        if(prevStation === start){
            bus = Math.abs(nextStation - current) + Math.abs(farestStation - nearestShop);
        }else if(prevStation > start  || nextStation > start){
            const prevBus = Math.abs(prevStation - current) + Math.abs(frStation - nearestShop);
            const nextBus = Math.abs(nextStation - current) + Math.abs(farestStation - nearestShop);
            bus = prevBus < nextBus ? prevBus : nextBus;
        }else {
            bus = 0;
        }
        energy += walk < bus || bus === 0 ? walk : bus;
        current = nearestShop > -1 ? nearestShop : walk + current;
        if(nearestShop > start){
            shopsVisited.push(nearestShop);
        }
    }
    return energy;
}

const findNearestShopsByCurrent = (current: number, shops: number[], shopsVisited: number[]) : number => {
    if(shopsVisited.length > 0){
        shops = shops.filter((shop)  => shop - current >= 0 && shopsVisited.indexOf(shop) === -1);
    }else{
        shops = shops.filter((shop)  => shop - current >= 0);
    }
    return shops.length > 0 ? shops[0] : -1;
}
const findNextNearestStationsByCurrent = (current: number, stations: number[], nearestShop: number) : { nextStation: number , farestStation: number } => {
    const nextStation : { value: number , index: number} = FindStationClosestValueByTarget(current, stations, false, false);
    stations = stations.slice(nextStation.index + 1);
    const farestStation : { value: number , index: number} = FindStationClosestValueByTarget(nearestShop, stations, true, false);
    return nextStation.value > -1 && farestStation.value > -1  ? { nextStation: nextStation.value , farestStation: farestStation.value } : { nextStation: -1, farestStation: -1 };
}

const findPrevNearestStationsByCurrent = (current: number, stations: number[], start: number, nearestShop: number) : { prevStation: number , frStation: number } => {
    if(current > start){
        const prevStation : { value: number , index: number } = FindStationClosestValueByTarget(current, stations, false, true);
        stations = stations.slice(prevStation.index + 1);
        const frStation : { value: number , index: number } = FindStationClosestValueByTarget(nearestShop, stations, true, true);
        return prevStation.value > -1 && frStation.value > -1 ? { prevStation: prevStation.value, frStation: frStation.value } : { prevStation: -1 , frStation: -1 };
    }
    return { prevStation: -1 , frStation: -1 };
}

const FindStationClosestValueByTarget = (target: number, stations: number[], useMathabs: boolean , isFindNearestPrev: boolean): { value: number , index: number }  =>  {
    let min: number = 0;
    let station: number = -1;
    let indexResult: number = -1;
    stations.forEach((value, index) => {
        if(min === 0){
            min = value;
        }
       
        if(isFindNearestPrev){
            const findNearestPrev: number = useMathabs ? Math.abs(target - value) : target - value;     
            if(findNearestPrev < min && findNearestPrev >= 0){
                min = findNearestPrev;
                station = value;
                indexResult = index;
            }
        }else{
            const findNearestNext: number = useMathabs ? Math.abs(value - target) : value - target;   
            if(findNearestNext < min && findNearestNext >= 0){
                min = findNearestNext;
                station = value;
                indexResult = index;
            }
        }
        
    });
    return { value: station , index: indexResult };
}
