import { Hero } from "@/components/hero"
import { ProdutosDestaque } from "@/components/produtos-destaque"
import { InfoServidor } from "@/components/info-servidor"
import { Categorias } from "@/components/categorias"
import { Depoimentos } from "@/components/depoimentos"

export default function PaginaInicial() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <Hero />
      <Categorias />
      <ProdutosDestaque />
      <InfoServidor />
      <Depoimentos />
    </main>
  )
}
