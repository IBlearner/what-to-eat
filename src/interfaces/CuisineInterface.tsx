import { FoodInterface } from "./FoodInterface";

export interface CuisineInterface extends FoodInterface {
    foods?: FoodInterface[]
}