import create from 'zustand';

interface AppState {  
    isLoading: boolean;
    setIsLoading: (newLoading: boolean) => void;
}

const useAppStore = create<AppState>()((set) => ({
    isLoading: false,
    setIsLoading: (newLoading) => set(() => ({
        isLoading: newLoading
    }))
}))

export default useAppStore;