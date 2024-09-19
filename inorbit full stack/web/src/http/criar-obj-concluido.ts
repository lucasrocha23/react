export async function CriarObjetivoConcluido(idMeta: string) {
  await fetch('http://localhost:3333/concluidos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      idMeta,
    }),
  })
}
