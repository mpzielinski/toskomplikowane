import { Card } from "@/components/ui/card"
import { Bot, Zap, Target } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Service {
  icon: LucideIcon
  title: string
  description: string
}

const SERVICES: Service[] = [
  {
    icon: Bot,
    title: "Dedykowane Agenty AI",
    description: "Tworzymy spersonalizowane rozwiązania AI dostosowane do specyfiki Twojego biznesu.",
  },
  {
    icon: Zap,
    title: "Automatyzacja Procesów",
    description: "Identyfikujemy i automatyzujemy powtarzalne zadania, oszczędzając czas i zasoby.",
  },
  {
    icon: Target,
    title: "Optymalizacja Wydajności",
    description: "Analizujemy procesy i implementujemy rozwiązania zwiększające efektywność.",
  },
]

export function ServiceCards() {
  return (
    <div className="grid md:grid-cols-3 gap-12">
      {SERVICES.map((service) => {
        const IconComponent = service.icon
        return (
          <Card
            key={service.title}
            className="p-8 text-center border border-gray-100 bg-white hover:shadow-lg transition-all duration-300"
          >
            <div className="w-12 h-12 mx-auto mb-6" aria-hidden="true">
              <IconComponent className="h-12 w-12 text-yellow-500" />
            </div>
            <h4 className="text-xl font-medium mb-4 text-black font-sans">{service.title}</h4>
            <p className="text-gray-600 leading-relaxed font-sans">{service.description}</p>
          </Card>
        )
      })}
    </div>
  )
}
