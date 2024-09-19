import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { db } from '../db'
import { objetivos, objetivosConcluidos } from '../db/schema'
import { and, count, eq, gte, lte, sql } from 'drizzle-orm'

dayjs.extend(weekOfYear)

export async function getObjetivosPendentes() {
  const primeiroDiaDaSemana = dayjs().startOf('week').toDate()
  const utlimoDiaDaSemana = dayjs().endOf('week').toDate()

  const objCriadosAteASemana = db.$with('objetivos_criados_ate_a_semana').as(
    db
      .select({
        id: objetivos.id,
        titulo: objetivos.titulo,
        frequenciaSemanal: objetivos.frequenciaSemanal,
        criadoEm: objetivos.criadoEm,
      })
      .from(objetivos)
      .where(lte(objetivos.criadoEm, utlimoDiaDaSemana))
  )

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
          lte(objetivosConcluidos.criadoEm, utlimoDiaDaSemana)
        )
      )
      .groupBy(objetivosConcluidos.idMeta)
  )

  const objPendentes = await db
    .with(objCriadosAteASemana, contagemObjConcluidos)
    .select({
      id: objCriadosAteASemana.id,
      titulo: objCriadosAteASemana.titulo,
      frequenciaSemanal: objCriadosAteASemana.frequenciaSemanal,
      contagemCompletos: sql`
        COALESCE(${contagemObjConcluidos.contagemCompletos}, 0)
      `.mapWith(Number),
    })
    .from(objCriadosAteASemana)
    .leftJoin(
      contagemObjConcluidos,
      eq(contagemObjConcluidos.idMeta, objCriadosAteASemana.id)
    )

  return {
    objPendentes,
  }
}
