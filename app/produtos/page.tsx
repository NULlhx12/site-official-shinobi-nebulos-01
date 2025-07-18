import { ProdutosVips } from "@/components/produtos-vips"
import { ProdutosSpins } from "@/components/produtos-spins"

export default function ProdutosPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="pt-20">
        <ProdutosVips />
        <ProdutosSpins />
      </div>
    </main>
  )
}
