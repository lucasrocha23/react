import z from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { criarObjetivo } from '../../funcoes/criar-objetivo'

export const rotaCriarObj: FastifyPluginAsyncZod = async app => {
  app.post(
    '/objetivos',
    {
      schema: {
        body: z.object({
          titulo: z.string(),
          frequenciaSemanal: z.number().int().min(1).max(7),
        }),
      },
    },
    async request => {
      const { titulo, frequenciaSemanal } = request.body

      await criarObjetivo({
        titulo,
        frequenciaSemanal,
      })
    }
  )
}
