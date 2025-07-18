"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, CreditCard, Smartphone, Copy, Check } from "lucide-react"

interface CheckoutModalProps {
  item: {
    id: string
    nome: string
    preco: string
    precoOriginal?: string
    tipo: "vip" | "spin"
    icone: string
  }
  isOpen: boolean
  onClose: () => void
}

export function CheckoutModal({ item, isOpen, onClose }: CheckoutModalProps) {
  const [step, setStep] = useState(1) // 1: Dados, 2: Pagamento, 3: Sucesso
  const [playerName, setPlayerName] = useState("")
  const [playerEmail, setPlayerEmail] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("pix")
  const [loading, setLoading] = useState(false)
  const [deliveryCode, setDeliveryCode] = useState("")
  const [transactionId, setTransactionId] = useState("")
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const totalPrice = Number.parseFloat(item.preco.replace("R$ ", "").replace(",", ".")) * quantity

  const handlePurchase = async () => {
    setLoading(true)

    try {
      const response = await fetch("/api/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerName,
          playerEmail,
          itemType: item.tipo,
          itemId: item.id,
          itemName: item.nome,
          quantity,
          price: totalPrice,
          paymentMethod,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setDeliveryCode(result.deliveryCode)
        setTransactionId(result.transactionId)
        setStep(3)
      } else {
        alert("❌ Erro na compra: " + result.error)
      }
    } catch (error) {
      alert("❌ Erro na compra. Tente novamente.")
    }

    setLoading(false)
  }

  const copyCode = () => {
    navigator.clipboard.writeText(deliveryCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">
            {step === 1 && "Finalizar Compra"}
            {step === 2 && "Pagamento"}
            {step === 3 && "Compra Realizada!"}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Resumo do Item */}
          <div className="bg-slate-700/50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg">{item.icone}</span>
              <Badge className="bg-orange-600">{item.tipo.toUpperCase()}</Badge>
            </div>
            <h3 className="text-white font-semibold">{item.nome}</h3>
            <div className="flex items-center justify-between mt-2">
              <span className="text-orange-400 font-bold">R$ {totalPrice.toFixed(2).replace(".", ",")}</span>
              {item.precoOriginal && <span className="text-gray-500 line-through text-sm">{item.precoOriginal}</span>}
            </div>
          </div>

          {/* Step 1: Dados do Jogador */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="playerName" className="text-gray-300">
                  Nick no Minecraft *
                </Label>
                <Input
                  id="playerName"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="SeuNick"
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div>
                <Label htmlFor="playerEmail" className="text-gray-300">
                  Email
                </Label>
                <Input
                  id="playerEmail"
                  type="email"
                  value={playerEmail}
                  onChange={(e) => setPlayerEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              {item.tipo === "spin" && (
                <div>
                  <Label htmlFor="quantity" className="text-gray-300">
                    Quantidade
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max="100"
                    value={quantity}
                    onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              )}

              <Button
                onClick={() => setStep(2)}
                disabled={!playerName}
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                Continuar para Pagamento
              </Button>
            </div>
          )}

          {/* Step 2: Método de Pagamento */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label className="text-gray-300">Método de Pagamento</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <Button
                    variant={paymentMethod === "pix" ? "default" : "outline"}
                    onClick={() => setPaymentMethod("pix")}
                    className="flex items-center gap-2"
                  >
                    <Smartphone className="w-4 h-4" />
                    PIX
                  </Button>
                  <Button
                    variant={paymentMethod === "card" ? "default" : "outline"}
                    onClick={() => setPaymentMethod("card")}
                    className="flex items-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    Cartão
                  </Button>
                </div>
              </div>

              <div className="bg-slate-700/50 p-4 rounded-lg">
                <h4 className="text-white font-semibold mb-2">Resumo da Compra</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Item:</span>
                    <span className="text-white">{item.nome}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Quantidade:</span>
                    <span className="text-white">{quantity}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Jogador:</span>
                    <span className="text-white">{playerName}</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t border-slate-600">
                    <span className="text-gray-400">Total:</span>
                    <span className="text-orange-400">R$ {totalPrice.toFixed(2).replace(".", ",")}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Voltar
                </Button>
                <Button onClick={handlePurchase} disabled={loading} className="flex-1 bg-green-600 hover:bg-green-700">
                  {loading ? "Processando..." : "Finalizar Compra"}
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Sucesso */}
          {step === 3 && (
            <div className="space-y-4 text-center">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-green-400">Compra Realizada!</h3>
              <p className="text-gray-300">
                Sua compra foi processada com sucesso. Use o código abaixo no servidor para resgatar:
              </p>

              <div className="bg-slate-700/50 p-4 rounded-lg">
                <Label className="text-gray-400 text-sm">Código de Resgate:</Label>
                <div className="flex items-center gap-2 mt-2">
                  <code className="bg-slate-900 px-3 py-2 rounded text-orange-400 font-mono text-lg flex-1">
                    {deliveryCode}
                  </code>
                  <Button size="sm" onClick={copyCode} variant="outline">
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                <h4 className="text-blue-400 font-semibold mb-2">Como resgatar:</h4>
                <ol className="text-sm text-gray-300 space-y-1 text-left">
                  <li>1. Entre no servidor Minecraft</li>
                  <li>
                    2. Digite: <code className="bg-slate-700 px-1 rounded">/resgatar {deliveryCode}</code>
                  </li>
                  <li>3. Seu item será entregue automaticamente!</li>
                </ol>
              </div>

              <p className="text-xs text-gray-400">ID da Transação: {transactionId}</p>

              <Button onClick={onClose} className="w-full bg-orange-600 hover:bg-orange-700">
                Fechar
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
