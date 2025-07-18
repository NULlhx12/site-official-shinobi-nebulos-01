"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCw, Package, Users, DollarSign } from "lucide-react"

interface Purchase {
  id: number
  player_name: string
  item_name: string
  item_type: string
  price: number
  status: string
  purchase_date: string
  delivery_code: string
}

export default function AdminPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalSales: 0,
    pendingDeliveries: 0,
    totalPlayers: 0,
  })

  const fetchPurchases = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/pending-purchases")
      const data = await response.json()
      if (data.success) {
        setPurchases(data.purchases)

        // Calcular estatísticas
        const totalSales = data.purchases.reduce((sum: number, p: Purchase) => sum + p.price, 0)
        const pendingDeliveries = data.purchases.filter((p: Purchase) => p.status === "paid").length
        const uniquePlayers = new Set(data.purchases.map((p: Purchase) => p.player_name)).size

        setStats({
          totalSales,
          pendingDeliveries,
          totalPlayers: uniquePlayers,
        })
      }
    } catch (error) {
      console.error("Erro ao buscar compras:", error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchPurchases()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-600"
      case "paid":
        return "bg-blue-600"
      case "delivered":
        return "bg-green-600"
      case "failed":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendente"
      case "paid":
        return "Pago"
      case "delivered":
        return "Entregue"
      case "failed":
        return "Falhou"
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Painel Administrativo</h1>
          <Button onClick={fetchPurchases} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Atualizar
          </Button>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Vendas Total</p>
                  <p className="text-2xl font-bold text-green-400">
                    R$ {stats.totalSales.toFixed(2).replace(".", ",")}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Entregas Pendentes</p>
                  <p className="text-2xl font-bold text-blue-400">{stats.pendingDeliveries}</p>
                </div>
                <Package className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Jogadores Únicos</p>
                  <p className="text-2xl font-bold text-purple-400">{stats.totalPlayers}</p>
                </div>
                <Users className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Compras */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Compras Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-orange-400" />
                <p className="text-gray-400">Carregando compras...</p>
              </div>
            ) : purchases.length === 0 ? (
              <div className="text-center py-8">
                <Package className="w-8 h-8 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-400">Nenhuma compra encontrada</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-gray-400">Jogador</th>
                      <th className="text-left py-3 px-4 text-gray-400">Item</th>
                      <th className="text-left py-3 px-4 text-gray-400">Preço</th>
                      <th className="text-left py-3 px-4 text-gray-400">Status</th>
                      <th className="text-left py-3 px-4 text-gray-400">Código</th>
                      <th className="text-left py-3 px-4 text-gray-400">Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchases.map((purchase) => (
                      <tr key={purchase.id} className="border-b border-slate-700/50">
                        <td className="py-3 px-4 text-white font-medium">{purchase.player_name}</td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="text-white">{purchase.item_name}</p>
                            <p className="text-gray-400 text-sm capitalize">{purchase.item_type}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-green-400 font-semibold">
                          R$ {purchase.price.toFixed(2).replace(".", ",")}
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(purchase.status)}>{getStatusText(purchase.status)}</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <code className="bg-slate-700 px-2 py-1 rounded text-orange-400 text-sm">
                            {purchase.delivery_code || "N/A"}
                          </code>
                        </td>
                        <td className="py-3 px-4 text-gray-400 text-sm">
                          {new Date(purchase.purchase_date).toLocaleDateString("pt-BR")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
