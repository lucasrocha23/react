import { CheckCircle2, Plus } from 'lucide-react'
import { Button } from './ui/button'
import { DialogTrigger } from './ui/dialog'
import { CriarObjetivo } from './criar-obj'
import { Logo } from './logo'
import { Progress, ProgressIndicator } from './ui/progress-bar'
import { Separator } from './ui/separator'
import { useQuery } from '@tanstack/react-query'
import { getResumo } from '../http/getResumo'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-BR'
import { ObjetivosPendentes } from './obj-pendentes'
import { useEffect } from 'react'

dayjs.locale(ptBR)

export function Resumo() {
  const { data: resumo } = useQuery({
    queryKey: ['resumo'],
    queryFn: getResumo,
    staleTime: 1000 * 60,
  })

  if (!resumo) {
    return null
  }

  const primeiroDiaDaSemana = dayjs().startOf('week').format('D MMM')
  const ultimoDiaDaSemana = dayjs().endOf('week').format('D MMM')

  const pctgmConcluidos = ((resumo.completos / resumo.total) * 100).toFixed()

  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="text-lg font-semibold capitalize">
            {primeiroDiaDaSemana} - {ultimoDiaDaSemana}
          </span>
        </div>

        <DialogTrigger asChild>
          <Button size="sm">
            <Plus />
            Cadastrar Meta
          </Button>
        </DialogTrigger>

        <CriarObjetivo />
      </div>

      <div className="flex flex-wrap flex-col gap-3">
        <Progress value={4} max={16}>
          <ProgressIndicator
            style={{
              width: `${pctgmConcluidos}%`,
            }}
          />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou{' '}
            <span className="text-zinc-100">{resumo?.completos}</span> de{' '}
            <span className="text-zinc-100">{resumo?.total}</span> metas nessa
            semana.
          </span>
          <span>{pctgmConcluidos}%</span>
        </div>

        <Separator />

        <ObjetivosPendentes />

        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-medium">Sua semana</h2>

          {resumo.completos > 0 &&
            Object.entries(resumo.objetivosPorDia).map(
              ([data, metas], index) => {
                return (
                  <div className="flex flex-col gap-4" key={data}>
                    <h3 className="font-medium">
                      <span className="capitalize">
                        {dayjs(data).format('dddd')}{' '}
                      </span>
                      <span className="text-zinc-400 text-xs ">
                        ({dayjs(data).format('D[ de ]MMMM')})
                      </span>
                    </h3>

                    <ul className="flex flex-col gap-3">
                      {metas.map(meta => {
                        return (
                          <li className="flex items-center gap-2" key={meta.id}>
                            <CheckCircle2 className="size-4 text-pink-500" />
                            <span className="text-sm text-zinc-400">
                              Você completou "
                              <span className="text-zinc-100">
                                {meta.titulo}
                              </span>
                              " às
                              <span className="text-zinc-100">
                                {' '}
                                {dayjs(meta.completoEm).format('H:mm')}
                              </span>
                            </span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )
              }
            )}
        </div>
      </div>
    </div>
  )
}
