import create from 'zustand';
import { FoodInterface } from '../interfaces/FoodInterface';
import { selectRandomFromArr, popIndexFromArr } from "../helpers/genericHelpers";
import { findIndexOfOption } from "../helpers/optionHelpers";

interface FoodSelectionState {
    optionPool: FoodInterface[];
    initPool: (pool: FoodInterface[]) => void;
    decreasePool: (option: FoodInterface) => void;

    leftOption: FoodInterface;
    rightOption: FoodInterface;
    setLeftOption: (option: FoodInterface) => void;
    setRightOption: (option: FoodInterface) => void;
  
    isLoading: boolean;
    setIsLoading: (newLoading: boolean) => void;

    winningOption: FoodInterface | null;
    setWinningOption: (option: FoodInterface | null) => void;
}

const defaultOption: FoodInterface = {
    name: "pizza",
    path: "./src/assets/piza.jpg",
    alt: "pizza"
}

const useFoodSelectionStore = create<FoodSelectionState>()((set) => ({
    optionPool: [],
    initPool: (pool) => {
        set(() => ({
            optionPool: pool
        }))
    },
    decreasePool: (option) => {
        set((state) => ({
            optionPool: [...popIndexFromArr(state.optionPool, findIndexOfOption(state.optionPool, option))]
        }))
    },

    leftOption: defaultOption,
    rightOption: defaultOption,
    setLeftOption: (option) => {
        set(() => ({
            leftOption: option
        }))
    },
    setRightOption: (option) => {
        set(() => ({
            rightOption: option
        }))
    },

    isLoading: false,
    setIsLoading: (newLoading) => set(() => ({
        isLoading: newLoading
    })),

    winningOption: null,
    setWinningOption: (option) => set(() => ({
        winningOption: option
    }))
}))

export default useFoodSelectionStore;