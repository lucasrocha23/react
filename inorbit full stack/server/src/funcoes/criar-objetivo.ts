import { db } from '../db'
import { objetivos } from '../db/schema'

interface RequisicaoCriarObj {
    titulo: string
    frequenciaSemanal: number
}

export async function criarObjetivo({
    titulo,
    frequenciaSemanal,
}: RequisicaoCriarObj) {
    const result = await db
        .insert(objetivos)
        .values({
            titulo,
            frequenciaSemanal,
        })
        .returning()

    const objetivo = result[0]

    return { objetivo }
}
