type ObjPendentesResposta = {
  id: string
  titulo: string
  frequenciaSemanal: number
  contagemCompletos: number
}

export async function GetObjetivosPendentes(): Promise<ObjPendentesResposta[]> {
  const response = await fetch('http://localhost:3333/obj-pendentes')
  const dados = await response.json()
  return dados.objPendentes
}
