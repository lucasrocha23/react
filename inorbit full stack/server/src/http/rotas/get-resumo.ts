import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getResumoSemanal } from '../../funcoes/get-resumo-semanal'

export const rotaGetResumo: FastifyPluginAsyncZod = async app => {
  app.get('/resumo', async () => {
    const { resumo } = await getResumoSemanal()

    return { resumo }
  })
}
