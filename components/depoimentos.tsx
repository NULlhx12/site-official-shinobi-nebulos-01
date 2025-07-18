import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const depoimentos = [
  {
    nome: "NarutoFan2024",
    avaliacao: 5,
    comentario: "Servidor incrível! O pacote Sharingan vale muito a pena. Melhor servidor de Naruto que já joguei!",
    rank: "Hokage",
  },
  {
    nome: "SasukeUchiha",
    avaliacao: 5,
    comentario: "Os jutsus customizados são incríveis. Staff super prestativo e a comunidade é incrível.",
    rank: "Capitão ANBU",
  },
  {
    nome: "KakashiSensei",
    avaliacao: 5,
    comentario: "Jogo há 2 anos. Atualizações regulares e novos conteúdos mantêm tudo sempre fresco!",
    rank: "Jounin",
  },
]

export function Depoimentos() {
  return (
    <section className="py-20 px-4 bg-slate-800/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">O que os Jogadores Dizem</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Junte-se a milhares de shinobis satisfeitos em nossa comunidade
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {depoimentos.map((depoimento, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>

                <p className="text-gray-300 mb-4 italic">"{depoimento.comentario}"</p>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold">{depoimento.nome}</p>
                    <p className="text-orange-400 text-sm">{depoimento.rank}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
