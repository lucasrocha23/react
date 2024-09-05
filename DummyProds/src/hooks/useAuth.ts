import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State{
    username: string
    email: string
    token: string
    setUsername: (nomeRecebido: string) => void
    setEmail: (emailRecebido: string) => void
    setToken: (tokenRecebido: string) => void
    logout: () => void
}

export const useAuth = create<State>()(
    persist(
        (set) => ({
            username: '',
            email: '',
            token: '',
        
            setUsername: (nomeRecebido) => set((state) => ({...state, username: nomeRecebido})),
            setEmail: (emailRecebido) => set((state) => ({...state, email: emailRecebido})),
            setToken: (tokenRecebido) => set((state) => ({...state, token: tokenRecebido})),
            logout: () => set(() => ({username: '', email: '', token: ''}))
        }),
        {
            name: '@useAuth'
        }
    )
)