import { Dialog } from './components/ui/dialog.tsx'
import { SemObjetivos } from './components/sem-obj.tsx'
import { Resumo } from './components/resumo.tsx'
import { useQuery } from '@tanstack/react-query'
import { getResumo } from './http/getResumo.ts'

export function App() {
  const { data: resumo, isLoading } = useQuery({
    queryKey: ['sumary'],
    queryFn: getResumo,
    staleTime: 1000 * 60,
  })

  if (isLoading) {
    return (
      <div>
        <h1>carregando...</h1>
      </div>
    )
  }

  return (
    <Dialog>
      {resumo?.total === 0 || resumo?.total === null ? <SemObjetivos /> : <Resumo />}
    </Dialog>
  )
}
