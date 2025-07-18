import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Hokage Rank",
    price: "$29.99",
    originalPrice: "$39.99",
    image: "/placeholder.svg?height=200&width=300",
    description: "Become the leader of your village with exclusive permissions and abilities",
    badge: "POPULAR",
    rating: 5,
    features: ["Village Leadership", "Exclusive Commands", "Special Chat Color", "Priority Support"],
  },
  {
    id: 2,
    name: "Sharingan Package",
    price: "$19.99",
    originalPrice: "$24.99",
    image: "/placeholder.svg?height=200&width=300",
    description: "Unlock the power of the Uchiha clan with the legendary Sharingan",
    badge: "LIMITED",
    rating: 5,
    features: ["3-Tomoe Sharingan", "Genjutsu Abilities", "Fire Style Jutsus", "Uchiha Outfit"],
  },
  {
    id: 3,
    name: "Legendary Weapon Set",
    price: "$15.99",
    originalPrice: null,
    image: "/placeholder.svg?height=200&width=300",
    description: "Collection of the most powerful ninja weapons and tools",
    badge: "NEW",
    rating: 4,
    features: ["Kusanagi Sword", "Explosive Kunai", "Shuriken Set", "Ninja Wire"],
  },
]

export function FeaturedProducts() {
  return (
    <section id="products" className="py-20 px-4 bg-slate-800/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Featured Products</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Our most popular items to enhance your ninja journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className="bg-slate-800/50 border-slate-700 hover:border-orange-500/50 transition-all duration-300 overflow-hidden group"
            >
              <div className="relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge
                  className={`absolute top-3 right-3 ${
                    product.badge === "POPULAR"
                      ? "bg-orange-600"
                      : product.badge === "LIMITED"
                        ? "bg-red-600"
                        : "bg-green-600"
                  }`}
                >
                  {product.badge}
                </Badge>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < product.rating ? "fill-current" : ""}`} />
                    ))}
                  </div>
                  <span className="text-gray-400 text-sm ml-2">({product.rating}.0)</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                <p className="text-gray-400 mb-4 text-sm">{product.description}</p>

                <ul className="text-sm text-gray-300 mb-4 space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-1 h-1 bg-orange-400 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-orange-400">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-gray-500 line-through">{product.originalPrice}</span>
                    )}
                  </div>
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Buy Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-orange-500 text-orange-400 hover:bg-orange-500/10 bg-transparent"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}
