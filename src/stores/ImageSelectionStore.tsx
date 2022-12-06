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
    selectLeftOption: () => void;
    selectRightOption: () => void;
  
    isLoading: boolean;
    setIsLoading: (newLoading: boolean) => void;
}

const defaultOption: ImageInterface = {
    name: "pizza",
    path: "./src/assets/piza.jpg",
    alt: "pizza"
}

const useImageSelectionStore = create<ImageSelectionState>()((set) => ({
    optionPool: [],
    initPool: (pool) => set(() => ({
        optionPool: pool
    })),
    decreasePool: (option) => {
        set((state) => ({
            optionPool: popIndexFromArr(state.optionPool, findIndexOfImage(state.optionPool, option))
        }))
    },

    leftOption: defaultOption,
    rightOption: defaultOption,
    selectLeftOption: () => {
        set((state) => ({
            // Can't just use the option pool as there is a chance left option === right option. Must use a new version of option pool without the right option
            leftOption: selectRandomFromArr([...popIndexFromArr(state.optionPool, findIndexOfImage(state.optionPool, state.rightOption))])
        }))
    },
    selectRightOption: () => {
        set((state) => ({
            // Can't just use the option pool as there is a chance left option === right option. Must use a new version of option pool without the left option
            rightOption: selectRandomFromArr([...popIndexFromArr(state.optionPool, findIndexOfImage(state.optionPool, state.leftOption))])
        }))
    },

    isLoading: false,
    setIsLoading: (newLoading) => set(() => ({
        isLoading: newLoading
    }))
}))

export default useImageSelectionStore;