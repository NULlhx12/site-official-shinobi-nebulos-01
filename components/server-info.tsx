import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Server, Users, Globe, Clock } from "lucide-react"

export function ServerInfo() {
  return (
    <section id="server" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Server Information</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Join the most immersive Naruto Minecraft experience</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-white mb-6">Why Choose Shinobi Nebulos?</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Server className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">Custom Naruto World</h4>
                  <p className="text-gray-400">Explore recreated villages from the anime with custom builds and NPCs</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">Active Community</h4>
                  <p className="text-gray-400">Join over 1000 active players in epic ninja battles and missions</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">Regular Updates</h4>
                  <p className="text-gray-400">New content, jutsus, and features added regularly</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Server Details</h3>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-slate-700">
                  <span className="text-gray-400">Server IP:</span>
                  <span className="text-white font-mono bg-slate-700 px-3 py-1 rounded">play.shinobinebulos.com</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-slate-700">
                  <span className="text-gray-400">Version:</span>
                  <span className="text-white">1.16.5 - 1.20.x</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-slate-700">
                  <span className="text-gray-400">Players Online:</span>
                  <span className="text-green-400 font-semibold">847/1000</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-slate-700">
                  <span className="text-gray-400">Uptime:</span>
                  <span className="text-white flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-green-400" />
                    99.9%
                  </span>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-3">
                Join Server Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
