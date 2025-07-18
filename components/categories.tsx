import { Card, CardContent } from "@/components/ui/card"
import { Crown, Zap, Sword, Shield, Star, Gift } from "lucide-react"

const categories = [
  {
    name: "Ranks",
    icon: Crown,
    description: "Unlock special permissions and abilities",
    color: "from-yellow-500 to-orange-500",
  },
  {
    name: "Jutsus",
    icon: Zap,
    description: "Powerful ninja techniques and abilities",
    color: "from-blue-500 to-purple-500",
  },
  {
    name: "Weapons",
    icon: Sword,
    description: "Legendary swords and ninja tools",
    color: "from-red-500 to-pink-500",
  },
  {
    name: "Armor",
    icon: Shield,
    description: "Protective gear and clan outfits",
    color: "from-green-500 to-teal-500",
  },
  {
    name: "Kekkei Genkai",
    icon: Star,
    description: "Rare bloodline abilities",
    color: "from-purple-500 to-indigo-500",
  },
  {
    name: "Packages",
    icon: Gift,
    description: "Complete starter and premium bundles",
    color: "from-orange-500 to-red-500",
  },
]

export function Categories() {
  return (
    <section id="categories" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Shop Categories</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover everything you need to become the ultimate shinobi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="bg-slate-800/50 border-slate-700 hover:border-orange-500/50 transition-all duration-300 cursor-pointer group"
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                <p className="text-gray-400">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
