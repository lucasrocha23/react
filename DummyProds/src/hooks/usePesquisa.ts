import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State{
    pesquisa: string
    setPesquisa: (pesquisaRecebida: string) => void
}

export const usePesquisa = create<State>()(
    persist(
        (set) => ({
            pesquisa: '',
        
            setPesquisa: (pesquisaRecebida) => set((state) => ({...state, pesquisa: pesquisaRecebida})),
        }),
        {
            name: '@usePesquisa'
        }
    )
)