
export const quickestPath = (
    board: 
    { 
        ladders: [number, number][]
        snakes:  [number, number][] 
    }
    ): number[] => {
        let { ladders, snakes } = board;
        ladders = ladders.sort((a, b) => a[0] - b[0]);
        snakes =  snakes.sort((a, b) => a[0] - b[0]);
        const MAX_POINT: number = 100;
        const START_POINT: number = 1;
        const MAX_DICE: number = 6;
        let dice: number = 0;
        let currentPoint: number = START_POINT;
        let resultArr: number[] = [];
        while(currentPoint < MAX_POINT){
            const { nearestLadder, nextLadder }: { nearestLadder: number , nextLadder: number } = findNearestLadderAndNextLadderByCurrentPoint(currentPoint, ladders);  
            if(nearestLadder > 0 && nextLadder > 0 && nearestLadder - currentPoint <= MAX_DICE ){
                dice = nearestLadder > 0 ? nearestLadder - currentPoint : dice
                currentPoint = nextLadder
                resultArr.push(dice)
            }else{
                const targetPoint: number = nearestLadder === 0 ? MAX_POINT - currentPoint : nearestLadder - currentPoint;
                const arrSize: number = Math.ceil(targetPoint / MAX_DICE);
                const nearestSnake: number = findNearestSnakeByCurrentPoint(currentPoint, snakes)
                const { numberArr, currPoint }: { numberArr: number[] , currPoint: number } = randomNumberByMaxDiceAndGenerateByArraySize(targetPoint, currentPoint, MAX_DICE, arrSize, nearestSnake)
                resultArr.push(...numberArr);
                currentPoint = nearestLadder === currPoint ? nextLadder : currPoint
            }
        }  
    return resultArr
}

const findNearestLadderAndNextLadderByCurrentPoint = (currentPoint: number, ladders: [number, number][] ) : { nearestLadder: number , nextLadder: number } => {
    const ladder : number[][] = ladders.filter((ladder)  => ladder[0] - currentPoint > 0);
    return ladder.length > 0 ? { nearestLadder:ladder[0][0], nextLadder: ladder[0][1] } : { nearestLadder: 0 , nextLadder: 0 }
}

const findNearestSnakeByCurrentPoint = (currentPoint: number, snakes: [number, number][] ) : number => {
    const snake : number[][] = snakes.filter((snake)  => snake[0] - currentPoint > 0)
    return snake.length > 0 ? snake[0][0] : 0 ;
}

const randomNumberByMaxDiceAndGenerateByArraySize = (targetPoint: number, currentPoint: number, MAX_DICE: number, arrSize: number, nearestSnake: number) : { numberArr: number[], currPoint: number } =>{
    let numberArr: number[] = [];
    const tempArr: number[] = [];
    while(numberArr.length < arrSize){
        const random: number = Math.floor(Math.random() * MAX_DICE) + 1;
        if(currentPoint+random != nearestSnake && tempArr.length < arrSize){
            tempArr.push(random)
            const sumPoint: number = sumPointArr(tempArr);
            if(sumPoint === targetPoint){
                numberArr = [...tempArr]
                currentPoint += sumPoint
            }
            tempArr.length = tempArr.length === arrSize ? 0 : tempArr.length;
        }
    }    
    return { numberArr, currPoint: currentPoint }
}

const sumPointArr = (numberArr : number[]) : number => {
    return numberArr.reduce((prev, curr) => { return prev + curr } , 0)
}