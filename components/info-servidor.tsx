"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, MessageCircle, Clock, RotateCcw, Trophy, Gamepad2 } from "lucide-react"

export function InfoServidor() {
  const handleDiscordClick = () => {
    window.open("https://discord.gg/6mNJwy7CuP", "_blank")
  }

  return (
    <section id="servidor" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Informações do Servidor</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">O melhor servidor de Naruto RP do Brasil te espera!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-white mb-6">Por que Escolher o Shinobi Nebulos?</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">Melhor Servidor Naruto RP do Brasil</h4>
                  <p className="text-gray-400">Reconhecido pela comunidade como o servidor mais completo e imersivo</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Gamepad2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">RP Ativo 24/7</h4>
                  <p className="text-gray-400">Roleplay constante com eventos, missões e interações entre jogadores</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">Discord com Sistemas Balanceados</h4>
                  <p className="text-gray-400">Comunidade organizada com bots exclusivos e sistemas automatizados</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <RotateCcw className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">Sistema de Spins Único</h4>
                  <p className="text-gray-400">
                    Spins Universais (R$ 2,50) e específicos para Clãs, Espadas e Vilas (R$ 1,50)
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">Comunidade Ativa</h4>
                  <p className="text-gray-400">
                    Mais de 1000 jogadores ativos participando de batalhas épicas e missões RP
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Detalhes do Servidor</h3>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-slate-700">
                  <span className="text-gray-400">IP do Servidor:</span>
                  <span className="text-white font-mono bg-slate-700 px-3 py-1 rounded">play.shinobinebulos.com</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-slate-700">
                  <span className="text-gray-400">Versão:</span>
                  <span className="text-white">1.12.2</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-slate-700">
                  <span className="text-gray-400">Jogadores Online:</span>
                  <span className="text-green-400 font-semibold">847/1000</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-slate-700">
                  <span className="text-gray-400">Uptime:</span>
                  <span className="text-white flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-green-400" />
                    99.9%
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-slate-700">
                  <span className="text-gray-400">Tipo:</span>
                  <span className="text-orange-400 font-semibold">Naruto RP</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-slate-700">
                  <span className="text-gray-400">Promoção Atual:</span>
                  <span className="text-green-400 font-semibold">15% OFF VIPs</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleDiscordClick}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-3"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Entrar no Discord
                </Button>
                <p className="text-center text-sm text-gray-400">
                  Entre no Discord para acessar o servidor e participar da comunidade!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
