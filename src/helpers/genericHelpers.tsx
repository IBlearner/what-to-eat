export function getRandomFromRange(max: number): number {
    return Math.floor(Math.random() * max);
}

export function selectRandomFromArr(array: any[], currentlyChosen: number = -1): any {
    let randomIndex: number = getRandomFromRange(array.length);
    if (currentlyChosen === randomIndex) {
        return selectRandomFromArr(array, currentlyChosen);
    } else {
        return array[randomIndex];
    }
}

export function popIndexFromArr(array: any[], index: number) {
    try {
        array.splice(index, (index >= 0) ? 1 : 0);        
    } catch (error) {
        console.log("Probably can't find the option in the option pool.")
    }
    return array;
}