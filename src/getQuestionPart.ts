
export const getQuestionPart = (phrases: string[]): string[] => {
    let strResult: string = ""; 
    let strCheck: string = ""; 
    phrases = phrases.map((value) => value.replace(/\s/g, ''))
    const phrase: string = phrases[0]
    const len: number = phrases.length
    for (let index = 0; index < phrase.length; index++) {
        let count = 0
        strCheck += phrase[index]
        for (let index2 = 1; index2 < len; index2++) {
            if(phrases[index2].search(strCheck) > -1) {
                count++
            }
        }
        if(count == len - 1){
            strResult = strCheck
        }else{
            strCheck = strCheck[strCheck.length - 1]
        }
    }
    return phrases.map((value) => value.replace(strResult , ""))
}

