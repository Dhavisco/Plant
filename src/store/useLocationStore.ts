import { create } from 'zustand';

interface LocationStore {
  location: string;
  setLocation: (newLocation: string) => void;
}

const useLocationStore = create<LocationStore>((set) => ({
  location: 'Lagos', // Default location
  setLocation: (newLocation) => set({ location: newLocation }),
}));

export default useLocationStore;
