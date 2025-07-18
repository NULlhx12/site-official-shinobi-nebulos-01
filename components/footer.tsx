import { Button } from "@/components/ui/button"
import { DiscIcon as Discord, Globe } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">忍</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Shinobi Nebulos</h3>
                <p className="text-xs text-orange-400">Loja Minecraft</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              O destino definitivo para entusiastas do Naruto Minecraft. Junte-se à nossa comunidade e desbloqueie seu
              potencial ninja hoje mesmo!
            </p>
            <div className="flex space-x-4">
              <Button
                size="sm"
                variant="outline"
                className="border-slate-700 text-gray-400 hover:text-white bg-transparent"
              >
                <Discord className="w-4 h-4 mr-2" />
                Discord
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-slate-700 text-gray-400 hover:text-white bg-transparent"
              >
                <Globe className="w-4 h-4 mr-2" />
                Website
              </Button>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-white font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Loja
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Ranks
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Pacotes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Suporte
                </a>
              </li>
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h4 className="text-white font-semibold mb-4">Suporte</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Central de Ajuda
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Fale Conosco
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Termos de Serviço
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Shinobi Nebulos. Todos os direitos reservados. | Não afiliado à Mojang ou Minecraft.
          </p>
        </div>
      </div>
    </footer>
  )
}
