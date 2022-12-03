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