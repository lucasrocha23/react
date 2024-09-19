import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { rotaCriarObj } from './rotas/criar-obj'
import { rotaCriarObjConcluido } from './rotas/criar-obj-concluido'
import { rotaGetObjPendentes } from './rotas/get-obj-pendentes'
import { rotaGetResumo } from './rotas/get-resumo'
import fastifyCors from '@fastify/cors'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, { origin: '*' })

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(rotaCriarObj)
app.register(rotaCriarObjConcluido)
app.register(rotaGetObjPendentes)
app.register(rotaGetResumo)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('http server executantdo')
  })
