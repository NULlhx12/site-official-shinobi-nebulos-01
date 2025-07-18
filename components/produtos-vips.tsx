"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Crown } from "lucide-react"
import { CheckoutModal } from "./checkout-modal"

const vips = [
  {
    id: "genesis",
    nome: "💎 VIP Genesis",
    preco: "R$ 12,75",
    precoOriginal: "R$ 15,00",
    desconto: "15% OFF",
    icone: "💎",
    tipo: "vip" as const,
    imagem: "/placeholder.svg?height=200&width=300&text=Genesis+Sword&bg=10b981&color=ffffff",
    cor: "from-emerald-500 to-teal-500",
    recursos: ["Benefícios Básicos VIP", "Chat Colorido", "Kits Exclusivos", "Suporte Prioritário"],
  },
  {
    id: "arising",
    nome: "⚡ VIP Arising",
    preco: "R$ 21,25",
    precoOriginal: "R$ 25,00",
    desconto: "15% OFF",
    icone: "⚡",
    tipo: "vip" as const,
    imagem: "/placeholder.svg?height=200&width=300&text=Arising+Blade&bg=3b82f6&color=ffffff",
    cor: "from-blue-500 to-cyan-500",
    recursos: ["Todos do Genesis", "Comandos Extras", "Fly em Áreas Permitidas", "Kits Avançados"],
  },
  {
    id: "awakening",
    nome: "🔥 VIP Awakening",
    preco: "R$ 34,00",
    precoOriginal: "R$ 40,00",
    desconto: "15% OFF",
    icone: "🔥",
    tipo: "vip" as const,
    imagem: "/placeholder.svg?height=200&width=300&text=Fire+Katana&bg=f97316&color=ffffff",
    cor: "from-orange-500 to-red-500",
    recursos: ["Todos do Arising", "Teleporte Home Extra", "Proteções Avançadas", "Benefícios PvP"],
  },
  {
    id: "immortal",
    nome: "👑 VIP Immortal",
    preco: "R$ 51,00",
    precoOriginal: "R$ 60,00",
    desconto: "15% OFF",
    icone: "👑",
    tipo: "vip" as const,
    imagem: "/placeholder.svg?height=200&width=300&text=Royal+Sword&bg=a855f7&color=ffffff",
    cor: "from-purple-500 to-pink-500",
    recursos: ["Todos do Awakening", "Comandos de Staff", "Benefícios Únicos", "Status Premium"],
  },
  {
    id: "ascendant",
    nome: "🌀 VIP Ascendant",
    preco: "R$ 72,25",
    precoOriginal: "R$ 85,00",
    desconto: "15% OFF",
    icone: "🌀",
    tipo: "vip" as const,
    imagem: "/placeholder.svg?height=200&width=300&text=Divine+Blade&bg=6366f1&color=ffffff",
    cor: "from-indigo-500 to-purple-600",
    recursos: ["Máximo Nível VIP", "Todos os Benefícios", "Acesso Total", "Prestígio Máximo"],
  },
]

export function ProdutosVips() {
  const [selectedItem, setSelectedItem] = useState<(typeof vips)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleBuyClick = (vip: (typeof vips)[0]) => {
    setSelectedItem(vip)
    setIsModalOpen(true)
  }

  return (
    <>
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">💎 VIPs Disponíveis</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Ranks VIP exclusivos com descontos especiais de 15%
            </p>
            <div className="mt-4 inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              🎉 Promoção Ativa: 15% de Desconto em Todos os VIPs!
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vips.map((vip) => (
              <Card
                key={vip.id}
                className="bg-slate-800/50 border-slate-700 hover:border-orange-500/50 transition-all duration-300 overflow-hidden group relative"
              >
                <Badge className="absolute top-3 right-3 bg-green-600 hover:bg-green-700 z-10">{vip.desconto}</Badge>

                <div className="relative h-48 overflow-hidden">
                  <img
                    src={vip.imagem || "/placeholder.svg"}
                    alt={vip.nome}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                </div>

                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div
                      className={`w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r ${vip.cor} flex items-center justify-center text-2xl`}
                    >
                      {vip.icone}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{vip.nome}</h3>
                  </div>

                  <ul className="text-sm text-gray-300 mb-6 space-y-2">
                    {vip.recursos.map((recurso, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-1 h-1 bg-orange-400 rounded-full mr-2"></span>
                        {recurso}
                      </li>
                    ))}
                  </ul>

                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <span className="text-2xl font-bold text-orange-400">{vip.preco}</span>
                      {vip.precoOriginal && (
                        <span className="text-gray-500 line-through text-lg">{vip.precoOriginal}</span>
                      )}
                    </div>
                    <p className="text-green-400 text-sm font-semibold">
                      Você economiza R${" "}
                      {(
                        Number.parseFloat(vip.precoOriginal!.replace("R$ ", "").replace(",", ".")) -
                        Number.parseFloat(vip.preco.replace("R$ ", "").replace(",", "."))
                      )
                        .toFixed(2)
                        .replace(".", ",")}
                    </p>
                  </div>

                  <Button
                    onClick={() => handleBuyClick(vip)}
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Comprar VIP
                  </Button>
                </CardContent>
              </Card>
            ))}
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
