"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ShoppingCart, User } from "lucide-react"
import Link from "next/link"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleDiscordClick = () => {
    window.open("https://discord.gg/6mNJwy7CuP", "_blank")
  }

  return (
    <header className="bg-slate-900/95 backdrop-blur-sm border-b border-orange-500/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">忍</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Shinobi Nebulos</h1>
              <p className="text-xs text-orange-400">Loja Minecraft</p>
            </div>
          </Link>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-orange-400 transition-colors">
              Início
            </Link>
            <Link href="/produtos" className="text-gray-300 hover:text-orange-400 transition-colors">
              Produtos
            </Link>
            <a href="#servidor" className="text-gray-300 hover:text-orange-400 transition-colors">
              Servidor
            </a>
            <button onClick={handleDiscordClick} className="text-gray-300 hover:text-orange-400 transition-colors">
              Discord
            </button>
          </nav>

          {/* Botões de Ação */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-orange-400">
              <User className="w-4 h-4 mr-2" />
              Entrar
            </Button>
            <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Carrinho
            </Button>
          </div>

          {/* Botão Menu Mobile */}
          <Button variant="ghost" size="sm" className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-orange-500/20">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-300 hover:text-orange-400 transition-colors">
                Início
              </Link>
              <Link href="/produtos" className="text-gray-300 hover:text-orange-400 transition-colors">
                Produtos
              </Link>
              <a href="#servidor" className="text-gray-300 hover:text-orange-400 transition-colors">
                Servidor
              </a>
              <button
                onClick={handleDiscordClick}
                className="text-gray-300 hover:text-orange-400 transition-colors text-left"
              >
                Discord
              </button>
              <div className="flex space-x-4 pt-4">
                <Button variant="ghost" size="sm" className="text-gray-300">
                  <User className="w-4 h-4 mr-2" />
                  Entrar
                </Button>
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Carrinho
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
