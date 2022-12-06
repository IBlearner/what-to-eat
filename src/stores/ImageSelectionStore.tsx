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
            leftOption: selectRandomFromArr(state.optionPool)
        }))
    },
    selectRightOption: () => {
        set((state) => ({
            rightOption: selectRandomFromArr(state.optionPool)
        }))
    },

    isLoading: false,
    setIsLoading: (newLoading) => set(() => ({
        isLoading: newLoading
    }))
}))

export default useImageSelectionStore;