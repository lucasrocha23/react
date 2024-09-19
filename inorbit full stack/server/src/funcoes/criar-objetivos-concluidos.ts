import { and, count, eq, gte, lte, sql } from 'drizzle-orm'
import { db } from '../db'
import { objetivos, objetivosConcluidos } from '../db/schema'
import dayjs from 'dayjs'

interface RequisicaoCriarObjConcluido {
  idMeta: string
}

export async function criarObjetivoConcluido({
  idMeta,
}: RequisicaoCriarObjConcluido) {
  const primeiroDiaDaSemana = dayjs().startOf('week').toDate()
  const utlimoDiaDaSemana = dayjs().endOf('week').toDate()

  const contagemObjConcluidos = db.$with('contagem_de_objetivos_concluidos').as(
    db
      .select({
        idMeta: objetivosConcluidos.idMeta,
        contagemCompletos: count(objetivosConcluidos.id).as(
          'contagemCompletos'
        ),
      })
      .from(objetivosConcluidos)
      .where(
        and(
          gte(objetivosConcluidos.criadoEm, primeiroDiaDaSemana),
          lte(objetivosConcluidos.criadoEm, utlimoDiaDaSemana),
          eq(objetivosConcluidos.idMeta, idMeta)
        )
      )
      .groupBy(objetivosConcluidos.idMeta)
  )

  const result = await db
    .with(contagemObjConcluidos)
    .select({
      idMeta: objetivos.id,
      frequenciaSemanal: objetivos.frequenciaSemanal,
      contagemCompletos: sql`
        COALESCE(${contagemObjConcluidos.contagemCompletos}, 0)
      `.mapWith(Number),
    })
    .from(objetivos)
    .leftJoin(contagemObjConcluidos, eq(objetivos.id, idMeta))
    .where(eq(objetivos.id, idMeta))

  const { frequenciaSemanal, contagemCompletos } = result[0]

  if (contagemCompletos >= frequenciaSemanal) {
    throw new Error('Objetivo já concluído essa semana!')
  }
  const resultInsercao = await db
    .insert(objetivosConcluidos)
    .values({ idMeta })
    .returning()

  const objetivoConcluido = resultInsercao[0]

  return {
    objetivoConcluido,
  }
}
