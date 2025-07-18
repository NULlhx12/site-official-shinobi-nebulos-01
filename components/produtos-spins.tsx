"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { CheckoutModal } from "./checkout-modal"

const spins = [
  {
    id: "universal",
    nome: "Spins Universais",
    preco: "R$ 2,50",
    quantidade: "1x Spin",
    icone: "✨",
    tipo: "spin" as const,
    imagem: "/placeholder.svg?height=200&width=300&text=Universal+Spin&bg=0ea5e9&color=ffffff",
    cor: "from-blue-500 to-cyan-500",
    descricao: "Funciona em qualquer categoria de spin",
  },
  {
    id: "clan",
    nome: "Spins de Clãs",
    preco: "R$ 1,50",
    quantidade: "1x Spin",
    icone: "🏮",
    tipo: "spin" as const,
    imagem: "/placeholder.svg?height=200&width=300&text=Clan+Spin&bg=dc2626&color=ffffff",
    cor: "from-red-500 to-orange-500",
    descricao: "Específico para clãs ninja",
  },
  {
    id: "sword",
    nome: "Spins de Espadas",
    preco: "R$ 1,50",
    quantidade: "1x Spin",
    icone: "⚔️",
    tipo: "spin" as const,
    imagem: "/placeholder.svg?height=200&width=300&text=Sword+Spin&bg=6b7280&color=ffffff",
    cor: "from-gray-500 to-slate-600",
    descricao: "Para armas lendárias",
  },
  {
    id: "village",
    nome: "Spins de Vilas",
    preco: "R$ 1,50",
    quantidade: "1x Spin",
    icone: "🏘️",
    tipo: "spin" as const,
    imagem: "/placeholder.svg?height=200&width=300&text=Village+Spin&bg=059669&color=ffffff",
    cor: "from-green-500 to-emerald-500",
    descricao: "Específico para vilas ninja",
  },
]

export function ProdutosSpins() {
  const [selectedItem, setSelectedItem] = useState<(typeof spins)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleBuyClick = (spin: (typeof spins)[0]) => {
    setSelectedItem(spin)
    setIsModalOpen(true)
  }

  return (
    <>
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">🎰 Spins Disponíveis</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Spins organizados por categoria e quantidade</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {spins.map((spin) => (
              <Card
                key={spin.id}
                className="bg-slate-800/50 border-slate-700 hover:border-orange-500/50 transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={spin.imagem || "/placeholder.svg"}
                    alt={spin.nome}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                </div>

                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${spin.cor} flex items-center justify-center group-hover:rotate-180 transition-transform duration-500 text-2xl`}
                  >
                    {spin.icone}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{spin.nome}</h3>
                  <p className="text-gray-400 mb-4">{spin.descricao}</p>

                  <div className="mb-4">
                    <span className="text-sm text-gray-400">Quantidade:</span>
                    <p className="text-lg font-semibold text-orange-400">{spin.quantidade}</p>
                  </div>

                  <div className="mb-6">
                    <span className="text-3xl font-bold text-orange-400">{spin.preco}</span>
                  </div>

                  <Button onClick={() => handleBuyClick(spin)} className="w-full bg-orange-600 hover:bg-orange-700">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Comprar Spin
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Opções de Quantidade para Spins */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-white mb-8">📦 Pacotes de Spins</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { qtd: "5x", desconto: "5%", economia: "Economize 5%" },
                { qtd: "10x", desconto: "10%", economia: "Economize 10%" },
                { qtd: "25x", desconto: "15%", economia: "Economize 15%" },
                { qtd: "50x", desconto: "20%", economia: "Economize 20%" },
              ].map((pacote, index) => (
                <Card
                  key={index}
                  className="bg-slate-800/30 border-slate-600 hover:border-orange-500/50 transition-colors"
                >
                  <CardContent className="p-4 text-center">
                    <h4 className="text-lg font-bold text-white mb-2">{pacote.qtd} Spins</h4>
                    <Badge className="bg-green-600 mb-2">{pacote.desconto} OFF</Badge>
                    <p className="text-sm text-green-400">{pacote.economia}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {selectedItem && (
        <CheckoutModal
          item={selectedItem}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedItem(null)
          }}
        />
      )}
    </>
  )
}
