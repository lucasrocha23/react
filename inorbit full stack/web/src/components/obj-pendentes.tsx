import { Plus } from 'lucide-react'
import { OutlineButton } from './ui/outline-button'
import { GetObjetivosPendentes } from '../http/get-obj-pendentes'
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query'
import { CriarObjetivoConcluido } from '../http/criar-obj-concluido'

export function ObjetivosPendentes() {
  const { data: objPendentes } = useQuery({
    queryKey: ['objetivos-pendentes'],
    queryFn: GetObjetivosPendentes,
    staleTime: 1000 * 60,
  })
  const queryClient = useQueryClient()

  if (!objPendentes) {
    return null
  }

  async function completarObjetivo(idMeta: string) {
    await CriarObjetivoConcluido(idMeta)

    queryClient.invalidateQueries({ queryKey: ['resumo'] })
    queryClient.invalidateQueries({ queryKey: ['objetivos-pendentes'] })
  }

  return (
    <div className="flex gap-3 flex-wrap">
      {objPendentes.map(meta => {
        return (
          <OutlineButton
            key={meta.id}
            disabled={meta.contagemCompletos === meta.frequenciaSemanal}
            onClick={() => completarObjetivo(meta.id)}
          >
            <Plus className="size-4 text-zinc-600" />
            {meta.titulo}
          </OutlineButton>
        )
      })}
    </div>
  )
}
