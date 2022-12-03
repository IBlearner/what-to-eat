import create from 'zustand';
import { ImageInterface } from '../interfaces/ImageInterface';
import {selectRandomFromArr } from "../helpers/helpers";

interface ImageSelectionState {
    justSelected: ImageInterface;

    optionPool: ImageInterface[];
    initPool: (pool: ImageInterface[]) => void;
    decreasePool: (option: ImageInterface) => void;

    leftOption: ImageInterface;
    rightOption: ImageInterface;
    selectLeftOption: () => void;
    selectRightOption: () => void;
    // onOptionClick: (id: "left" | "right", option: ImageInterface) => void;
    

    isLoading: boolean;
    setIsLoading: (newLoading: boolean) => void;
}

const defaultOption: ImageInterface = {
    name: "pizza",
    path: "./src/assets/pizza.jpg",
    alt: "pizza"
}

const useImageSelectionStore = create<ImageSelectionState>()((set) => ({
    justSelected: defaultOption,

    optionPool: [],
    initPool: (pool) => set(() => ({
        optionPool: pool
    })),
    decreasePool: (option) => {
        set((state) => ({
            // optionPool: [...state.optionPool.splice(state.optionPool.indexOf(option), 1)]
            justSelected: option,
            optionPool: [...state.optionPool],

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