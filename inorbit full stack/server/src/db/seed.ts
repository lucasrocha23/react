import dayjs from 'dayjs'
import { client, db } from '.'
import { objetivosConcluidos, objetivos } from './schema'

async function seed() {
    await db.delete(objetivosConcluidos)
    await db.delete(objetivos)

    const resultado = await db
        .insert(objetivos)
        .values([
            { titulo: 'Acordar cedo', frequenciaSemanal: 5 },
            { titulo: 'Correr', frequenciaSemanal: 3 },
            { titulo: 'Exercitar', frequenciaSemanal: 5 },
        ])
        .returning()

    const inicioSemana = dayjs().startOf('week')

    await db.insert(objetivosConcluidos).values([
        { idMeta: resultado[0].id, criadoEm: inicioSemana.toDate() },
        {
            idMeta: resultado[1].id,
            criadoEm: inicioSemana.add(1, 'day').toDate(),
        },
        { idMeta: resultado[2].id, criadoEm: new Date() },
    ])
}

seed().finally(() => {
    client.end()
})
