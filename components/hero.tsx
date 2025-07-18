"use client"

import { Button } from "@/components/ui/button"
import { Crown, RotateCcw, MessageCircle, Trophy } from "lucide-react"
import Link from "next/link"

export function Hero() {
  const handleDiscordClick = () => {
    window.open("https://discord.gg/6mNJwy7CuP", "_blank")
  }

  return (
    <section id="inicio" className="relative py-20 px-4 overflow-hidden">
      {/* Efeitos de Fundo */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-600/10" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-red-600/20 rounded-full blur-3xl" />

      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Shinobi Nebulos
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4">O Melhor Servidor Naruto RP do Brasil</p>
          <p className="text-lg text-yellow-400 mb-8 font-semibold">🏆 Versão 1.12.2 • RP Ativo 24/7</p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Desbloqueie VIPs exclusivos e spins únicos! Aproveite nossos descontos especiais de 15% em todos os VIPs.
            Spins Universais por R$ 2,50 e Spins específicos por R$ 1,50!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/produtos">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-3"
              >
                <Crown className="w-5 h-5 mr-2" />
                Ver Produtos
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-orange-500 text-orange-400 hover:bg-orange-500/10 px-8 py-3 bg-transparent"
              onClick={handleDiscordClick}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Entrar no Discord
            </Button>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-orange-500/20">
              <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-white mb-2">#1</h3>
              <p className="text-gray-400">Servidor RP Brasil</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-orange-500/20">
              <Crown className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-white mb-2">5</h3>
              <p className="text-gray-400">VIPs Disponíveis</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-orange-500/20">
              <RotateCcw className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-white mb-2">4</h3>
              <p className="text-gray-400">Tipos de Spins</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-orange-500/20">
              <MessageCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-white mb-2">1000+</h3>
              <p className="text-gray-400">Membros Discord</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
