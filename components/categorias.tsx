import { Card, CardContent } from "@/components/ui/card"
import { Crown, RotateCcw, Sparkles } from "lucide-react"

const categorias = [
  {
    nome: "VIPs",
    icone: Crown,
    descricao: "Ranks VIP exclusivos com benefícios únicos",
    cor: "from-purple-500 to-pink-500",
  },
  {
    nome: "Spins Universais",
    icone: Sparkles,
    descricao: "Spins que funcionam em qualquer categoria - R$ 2,50",
    cor: "from-blue-500 to-cyan-500",
  },
  {
    nome: "Spins de Clãs",
    icone: RotateCcw,
    descricao: "Spins específicos para clãs ninja - R$ 1,50",
    cor: "from-red-500 to-orange-500",
  },
  {
    nome: "Spins de Espadas",
    icone: RotateCcw,
    descricao: "Spins para armas lendárias - R$ 1,50",
    cor: "from-gray-500 to-slate-600",
  },
  {
    nome: "Spins de Vilas",
    icone: RotateCcw,
    descricao: "Spins específicos para vilas ninja - R$ 1,50",
    cor: "from-green-500 to-emerald-500",
  },
]

export function Categorias() {
  return (
    <section id="categorias" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Categorias da Loja</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Descubra VIPs exclusivos e spins para potencializar sua experiência ninja
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categorias.map((categoria, index) => (
            <Card
              key={index}
              className="bg-slate-800/50 border-slate-700 hover:border-orange-500/50 transition-all duration-300 cursor-pointer group"
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${categoria.cor} flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  <categoria.icone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{categoria.nome}</h3>
                <p className="text-gray-400">{categoria.descricao}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
