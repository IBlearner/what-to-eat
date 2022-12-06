import { ImageInterface } from "../interfaces/ImageInterface";


export function findIndexOfImage(array: ImageInterface[], option: ImageInterface): number {
    // Cannot just use indexOf, will return -1

    let index: number = -1;
    for (let i = 0; i < array.length; i++) {
        if (array[i].name === option.name) {
            index = i;
            break;
        }
    }
    return index;
}
