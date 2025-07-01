import { create } from 'zustand'
import { UserTypeProps } from '../interfaces'

const usersStore = create((set) => ({
    currentUser: null,
    setCurrentUser: (user:UserTypeProps) => set({ currentUser: user }),
}))


export default usersStore

export interface UsersStoreProps {
    currentUser: UserTypeProps | null;
    setCurrentUser: (user: UserTypeProps) => void;
}