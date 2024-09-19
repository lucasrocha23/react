import z from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getObjetivosPendentes } from '../../funcoes/get-objetivos-pendentes'

export const rotaGetObjPendentes: FastifyPluginAsyncZod = async app => {
  app.get('/obj-pendentes', async () => {
    const { objPendentes } = await getObjetivosPendentes()

    return { objPendentes }
  })
}
