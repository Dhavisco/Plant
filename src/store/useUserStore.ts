// src/store/useUserStore.ts
import { create } from 'zustand';
import { auth, db } from '../components/hooks/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface UserDetails {
  first_name?: string;
  last_name?: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
}

interface UserStore {
  userDetails: UserDetails | null;
  isLoading: boolean;
  fetchUserData: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  userDetails: null,
  isLoading: true,

  fetchUserData: async () => {
    set({ isLoading: true });
    
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        const docRef = doc(db, 'Users', uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const firestoreData = docSnap.data();
          set({
            userDetails: {
              ...firestoreData,
              email: email || firestoreData.email,
              displayName: displayName || firestoreData.displayName,
              photoURL: photoURL || firestoreData.photoURL,
            },
            isLoading: false,
          });
        } else {
          const defaultData: UserDetails = {
            email: email || undefined,
            displayName: displayName || undefined,
            photoURL: photoURL || undefined,
          };

          await setDoc(docRef, defaultData);
          set({ userDetails: defaultData, isLoading: false });
        }
      } else {
        set({ userDetails: null, isLoading: false });
      }
    });
  },
}));
