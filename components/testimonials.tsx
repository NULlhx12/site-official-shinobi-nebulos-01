import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "NarutoFan2024",
    rating: 5,
    comment: "Amazing server! The Sharingan package is totally worth it. Best Naruto server I've played on!",
    rank: "Hokage",
  },
  {
    name: "SasukeUchiha",
    rating: 5,
    comment: "The custom jutsus are incredible. Staff is super helpful and the community is awesome.",
    rank: "ANBU Captain",
  },
  {
    name: "KakashiSensei",
    rating: 5,
    comment: "Been playing for 2 years now. Regular updates and new content keep it fresh!",
    rank: "Jounin",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 px-4 bg-slate-800/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">What Players Say</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join thousands of satisfied shinobi in our community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>

                <p className="text-gray-300 mb-4 italic">"{testimonial.comment}"</p>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-orange-400 text-sm">{testimonial.rank}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
