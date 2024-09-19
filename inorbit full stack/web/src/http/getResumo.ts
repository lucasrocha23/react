type ObjetivosPorDia = Record<
  string,
  {
    id: string
    titulo: string
    completoEm: string
  }[]
>

type Resumo = {
  completos: number
  total: number
  objetivosPorDia: ObjetivosPorDia
}
export async function getResumo(): Promise<Resumo> {
  const response = await fetch('http://localhost:3333/resumo')
  const dados = await response.json()

  return dados.resumo
}
