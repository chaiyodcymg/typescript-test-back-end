
export const quickestPath = (
    board: 
    { 
        ladders: [number, number][]
        snakes:  [number, number][] 
    }
    ): number[] => {
        const { ladders, snakes } = board
        const MAX_POINT: number = 100;
        const START_POINT: number = 1;
        const MAX_DICE: number = 6;
        let dice: number = 0;
        let currentPoint: number = START_POINT;
        let resultArr: number[] = [];
        while(currentPoint < MAX_POINT){
            const { nearestLadder, nextLadder } = findNearestLadderAndNextLadderByCurrentPoint(currentPoint, ladders)
            if(nearestLadder > 0 && nextLadder > 0){
                dice = nearestLadder > 0 ? nearestLadder - currentPoint : dice
                currentPoint = nextLadder
                resultArr.push(dice)
            }else{
                const targetPoint = MAX_POINT - currentPoint
                const arrSize = Math.ceil(targetPoint / MAX_DICE)
                const nearestSnake = findNearestSnakeByCurrentPoint(currentPoint, snakes)
                const { numberArr, currPoint } = randomNumberMaxSix(targetPoint, currentPoint, MAX_DICE, arrSize, nearestSnake)
                resultArr = [...resultArr, ...numberArr]
                currentPoint = currPoint
            }
        }  
    return resultArr
}

const findNearestLadderAndNextLadderByCurrentPoint = (currentPoint: number, ladders: [number, number][] ) : { nearestLadder: number , nextLadder: number } => {
    let nearestLadder: number = 0;
    let nextLadder: number = 0;
    for (const ladder of ladders) {       
        const startLadder: number = ladder[0]
        const endLadder: number = ladder[1]
        if(startLadder - currentPoint > 0){
            nearestLadder = startLadder
            nextLadder = endLadder
            return { nearestLadder , nextLadder }
        }
    }
    return { nearestLadder , nextLadder }
}

const findNearestSnakeByCurrentPoint = (currentPoint: number, snakes: [number, number][] ) : number => {
    let nearestSnake: number = 0;
    for (const snake of snakes) {       
        const startSnake: number = snake[0]
        if(startSnake - currentPoint > 0){
            nearestSnake = startSnake
            return nearestSnake
        }
    }
    return nearestSnake 
}

const randomNumberMaxSix = (targetPoint: number, currentPoint: number, MAX_DICE: number, arrSize: number, nearestSnake: number) : { numberArr: number[], currPoint: number } =>{
    let numberArr: number[] = [];
    let tempArr: number[] = [];
    while(numberArr.length < arrSize){
        const random: number = randomNumberByMaxDice(MAX_DICE);
        if(currentPoint+random != nearestSnake && tempArr.length < arrSize){
            tempArr.push(random)
            const sumPoint: number = sumPointArr(tempArr);
            if(sumPoint === targetPoint){
                numberArr = [...tempArr]
                currentPoint += sumPoint
            }
            if(tempArr.length == arrSize){
                tempArr.length = 0
                const random: number = randomNumberByMaxDice(MAX_DICE);
                tempArr.push(random)
            }
        }
    }    
    return { numberArr, currPoint: currentPoint }
}

const randomNumberByMaxDice = (maxNumber: number) : number => {
   return Math.floor(Math.random() * maxNumber) + 1
}

const sumPointArr = (numberArr : number[]) : number => {
    return numberArr.reduce((prev, curr) => { return prev + curr } , 0)
}


