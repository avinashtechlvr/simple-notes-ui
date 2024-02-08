import { create } from "zustand";
import type { User } from "types";

interface UserState {
    user: User | null;
    isUserLoggedIn: boolean;
    saveUser: (user: User) => void;
    logInUser: () => void;
    logOutUser: () => void;
}
export const useUserStore = create<UserState>((set) => ({
    user: null,
    isUserLoggedIn: false,
    saveUser: (user: User) => set({ user }),
    logInUser: () => set({ isUserLoggedIn: true }),
    logOutUser: () => { 
        sessionStorage.removeItem('accessToken');
        set({ isUserLoggedIn: false });
    },
}))