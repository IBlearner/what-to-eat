import create from 'zustand';
import { CuisineInterface } from '../interfaces/CuisineInterface';
import { selectRandomFromArr, popIndexFromArr } from "../helpers/genericHelpers";
import { findIndexOfOption } from "../helpers/optionHelpers";

interface CuisineSelectionState {
    optionPool: CuisineInterface[];
    initPool: (pool: CuisineInterface[]) => void;
    decreasePool: (option: CuisineInterface) => void;

    leftOption: CuisineInterface;
    rightOption: CuisineInterface;
    setLeftOption: (option: CuisineInterface) => void;
    setRightOption: (option: CuisineInterface) => void;
  
    isLoading: boolean;
    setIsLoading: (newLoading: boolean) => void;

    winningOption: CuisineInterface | null;
    setWinningOption: (option: CuisineInterface) => void;
}

const defaultOption: CuisineInterface = {
    name: "pizza",
    path: "./src/assets/piza.jpg",
    alt: "pizza"
}

const useCuisineSelectionStore = create<CuisineSelectionState>()((set) => ({
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

export default useCuisineSelectionStore;