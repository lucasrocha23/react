import logo from '../assets/logo.svg'
import letsStart from '../assets/lets-start.svg'
import { Plus } from 'lucide-react'
import { Button } from './ui/button'
import { Dialog, DialogTrigger } from './ui/dialog'
import { CriarObjetivo } from './criar-obj'

export function SemObjetivos() {
  return (
    <Dialog>
      <div className="h-screen flex flex-col items-center justify-center gap-8">
        <img src={logo} alt="in.orbit" />
        <img src={letsStart} alt="lets-Start" />

        <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
          Você ainda não cadastrou nenhuma meta, que tal cadastrar uma agora
          mesmo?
        </p>

        <DialogTrigger asChild>
          <Button>
            <Plus />
            Cadastrar Meta
          </Button>
        </DialogTrigger>
      </div>

      <CriarObjetivo />
    </Dialog>
  )
}
