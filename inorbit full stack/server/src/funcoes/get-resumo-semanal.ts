import { and, count, desc, eq, gte, lte, sql } from 'drizzle-orm'
import { db } from '../db'
import { objetivos, objetivosConcluidos } from '../db/schema'
import dayjs from 'dayjs'

export async function getResumoSemanal() {
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

  const objConcluidosNaSemana = db.$with('objetivos_concluidos_na_semana').as(
    db
      .select({
        id: objetivosConcluidos.id,
        titulo: objetivos.titulo,
        concluidoEm: objetivosConcluidos.criadoEm,
        concluidoNaData: sql`
          DATE(${objetivosConcluidos.criadoEm})
        `.as('concluidoNaData'),
      })
      .from(objetivosConcluidos)
      .innerJoin(objetivos, eq(objetivos.id, objetivosConcluidos.idMeta))
      .where(
        and(
          gte(objetivosConcluidos.criadoEm, primeiroDiaDaSemana),
          lte(objetivosConcluidos.criadoEm, utlimoDiaDaSemana)
        )
      )
      .orderBy(desc(objetivosConcluidos.criadoEm))
  )

  const objConcluidosPorDiaDaSemana = db
    .$with('objetivo_concluidos_por_dia_da_semana')
    .as(
      db
        .select({
          concluidoNaData: objConcluidosNaSemana.concluidoNaData,
          completos: sql`
            JSON_AGG(
              JSON_BUILD_OBJECT(
                'id', ${objConcluidosNaSemana.id},
                'titulo',${objConcluidosNaSemana.titulo},
                'completoEm', ${objConcluidosNaSemana.concluidoEm}
              )
            )
          `.as('completos'),
        })
        .from(objConcluidosNaSemana)
        .groupBy(objConcluidosNaSemana.concluidoNaData)
        .orderBy(desc(objConcluidosNaSemana.concluidoNaData))
    )

  const result = await db
    .with(
      objCriadosAteASemana,
      objConcluidosNaSemana,
      objConcluidosPorDiaDaSemana
    )
    .select({
      completos: sql`(SELECT COUNT(*) FROM ${objConcluidosNaSemana})`.mapWith(
        Number
      ),
      total:
        sql`(SELECT SUM(${objCriadosAteASemana.frequenciaSemanal}) FROM ${objCriadosAteASemana})`.mapWith(
          Number
        ),
      objetivosPorDia: sql`
        JSON_OBJECT_AGG(
          ${objConcluidosPorDiaDaSemana.concluidoNaData},
          ${objConcluidosPorDiaDaSemana.completos}
        )
      `,
    })
    .from(objConcluidosPorDiaDaSemana)

  return {
    resumo: result[0],
  }
}
