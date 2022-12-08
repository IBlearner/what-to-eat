import { FoodInterface } from "../interfaces/FoodInterface";

export function findIndexOfOption(array: FoodInterface[], option: FoodInterface): number {
    // Cannot just use indexOf when using objects, will return -1 (different reference perhaps?)

    let index: number = -1;
    for (let i = 0; i < array.length; i++) {
        if (array[i].name === option.name) {
            index = i;
            break;
        }
    }
    return index;
}
