import create from 'zustand';
import { ImageInterface } from '../interfaces/ImageInterface';
import { selectRandomFromArr, popIndexFromArr } from "../helpers/genericHelpers";
import { findIndexOfImage } from "../helpers/imageHelpers";

interface ImageSelectionState {
    optionPool: ImageInterface[];
    initPool: (pool: ImageInterface[]) => void;
    decreasePool: (option: ImageInterface) => void;

    leftOption: ImageInterface;
    rightOption: ImageInterface;
    setLeftOption: (option: ImageInterface) => void;
    setRightOption: (option: ImageInterface) => void;
  
    isLoading: boolean;
    setIsLoading: (newLoading: boolean) => void;

    winningOption: ImageInterface | null;
    setWinningOption: (option: ImageInterface) => void;
}

const defaultOption: ImageInterface = {
    name: "pizza",
    path: "./src/assets/piza.jpg",
    alt: "pizza"
}

const useImageSelectionStore = create<ImageSelectionState>()((set) => ({
    optionPool: [],
    initPool: (pool) => {
        set(() => ({
            optionPool: pool
        }))
    },
    decreasePool: (option) => {
        set((state) => ({
            optionPool: [...popIndexFromArr(state.optionPool, findIndexOfImage(state.optionPool, option))]
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

export default useImageSelectionStore;