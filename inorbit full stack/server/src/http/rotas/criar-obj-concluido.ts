import z from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { criarObjetivoConcluido } from '../../funcoes/criar-objetivos-concluidos'

export const rotaCriarObjConcluido: FastifyPluginAsyncZod = async app => {
  app.post(
    '/concluidos',
    {
      schema: {
        body: z.object({
          idMeta: z.string(),
        }),
      },
    },
    async request => {
      const { idMeta } = request.body

      await criarObjetivoConcluido({
        idMeta,
      })
    }
  )
}
