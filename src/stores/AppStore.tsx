import create from 'zustand';

interface AppState {
    // Keeps track of the loading so the comparer cannot be interacted with
    isLoading: boolean;
    setIsLoading: (newLoading: boolean) => void;

    // This mode dictates what the user wants to choose from eg. food or cuisine
    mode: string;
    setMode: (newMode: string) => void;

    // Instructs the app to reset itself
    reset: boolean;
    setReset: (val: boolean) => void;
}

const useAppStore = create<AppState>()((set) => ({
    mode: "",
    setMode: (newMode) => set(() => ({
        mode: newMode
    })),

    isLoading: false,
    setIsLoading: (newLoading) => set(() => ({
        isLoading: newLoading
    })),

    reset: false,
    setReset: (val) => set(() => ({
        reset: val
    })),
}))

export default useAppStore;