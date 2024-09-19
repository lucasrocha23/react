interface CriarObjResquisicao {
  titulo: string
  frequenciaSemanal: number
}

export async function criarObjetivo({
  titulo,
  frequenciaSemanal,
}: CriarObjResquisicao) {
  await fetch('http://localhost:3333/objetivos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      titulo,
      frequenciaSemanal,
    }),
  })
}
