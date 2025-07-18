import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Crown, Sparkles } from "lucide-react"
import Link from "next/link"

const produtosDestaque = [
  {
    id: 1,
    nome: "🔥 VIP Awakening",
    preco: "R$ 34,00",
    precoOriginal: "R$ 40,00",
    desconto: "15% OFF",
    imagem: "/placeholder.svg?height=200&width=300&text=Fire+Katana&bg=f97316&color=ffffff",
    tipo: "VIP",
    badge: "POPULAR",
  },
  {
    id: 2,
    nome: "Spins Universais",
    preco: "R$ 2,50",
    precoOriginal: null,
    desconto: null,
    imagem: "/placeholder.svg?height=200&width=300&text=Universal+Spin&bg=0ea5e9&color=ffffff",
    tipo: "Spin",
    badge: "VERSÁTIL",
  },
  {
    id: 3,
    nome: "👑 VIP Immortal",
    preco: "R$ 51,00",
    precoOriginal: "R$ 60,00",
    desconto: "15% OFF",
    imagem: "/placeholder.svg?height=200&width=300&text=Royal+Sword&bg=a855f7&color=ffffff",
    tipo: "VIP",
    badge: "PREMIUM",
  },
]

export function ProdutosDestaque() {
  return (
    <section id="produtos-destaque" className="py-20 px-4 bg-slate-800/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">🌟 Produtos em Destaque</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Os produtos mais populares do nosso servidor</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {produtosDestaque.map((produto) => (
            <Card
              key={produto.id}
              className="bg-slate-800/50 border-slate-700 hover:border-orange-500/50 transition-all duration-300 overflow-hidden group relative"
            >
              {produto.desconto && (
                <Badge className="absolute top-3 right-3 bg-green-600 hover:bg-green-700 z-10">
                  {produto.desconto}
                </Badge>
              )}
              {produto.badge && (
                <Badge
                  className={`absolute top-3 left-3 z-10 ${
                    produto.badge === "POPULAR"
                      ? "bg-orange-600"
                      : produto.badge === "PREMIUM"
                        ? "bg-purple-600"
                        : "bg-blue-600"
                  }`}
                >
                  {produto.badge}
                </Badge>
              )}

              <div className="relative h-48 overflow-hidden">
                <img
                  src={produto.imagem || "/placeholder.svg"}
                  alt={produto.nome}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              </div>

              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-white mb-2">{produto.nome}</h3>
                <p className="text-gray-400 mb-4">Tipo: {produto.tipo}</p>

                <div className="mb-6">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-2xl font-bold text-orange-400">{produto.preco}</span>
                    {produto.precoOriginal && (
                      <span className="text-gray-500 line-through text-lg">{produto.precoOriginal}</span>
                    )}
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                  {produto.tipo === "VIP" ? <Crown className="w-4 h-4 mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
                  Comprar Agora
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/produtos">
            <Button
              size="lg"
              variant="outline"
              className="border-orange-500 text-orange-400 hover:bg-orange-500/10 bg-transparent"
            >
              Ver Todos os Produtos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
