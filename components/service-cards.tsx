"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bot, Zap, Target, MessageCircle } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { ChatbotModal } from "./chatbot-modal"

type ServiceType = "ai-agents" | "automation" | "optimization" | null

interface Service {
  id: ServiceType
  icon: LucideIcon
  title: string
  description: string
  initialMessage: string
}

const SERVICES: Service[] = [
  {
    id: "ai-agents",
    icon: Bot,
    title: "Dedykowane Agenty AI",
    description: "Tworzymy spersonalizowane rozwiązania AI dostosowane do specyfiki Twojego biznesu.",
    initialMessage:
      "Cześć! 👋 Chciałbyś dowiedzieć się więcej o dedykowanych agentach AI? To fascynujący temat! Agenty AI to inteligentne systemy, które mogą automatycznie wykonywać zadania specyficzne dla Twojego biznesu - od obsługi klienta, przez analizę danych, po zarządzanie procesami. Co Cię najbardziej interesuje w tym temacie?",
  },
  {
    id: "automation",
    icon: Zap,
    title: "Automatyzacja Procesów",
    description: "Identyfikujemy i automatyzujemy powtarzalne zadania, oszczędzając czas i zasoby.",
    initialMessage:
      "Witaj! ⚡ Automatyzacja procesów to klucz do efektywności w dzisiejszym biznesie. Mogę pomóc Ci zrozumieć, jak zidentyfikować procesy nadające się do automatyzacji w Twojej firmie - od prostych zadań administracyjnych po złożone przepływy pracy. Jakie powtarzalne zadania zajmują Ci najwięcej czasu?",
  },
  {
    id: "optimization",
    icon: Target,
    title: "Optymalizacja Wydajności",
    description: "Analizujemy procesy i implementujemy rozwiązania zwiększające efektywność.",
    initialMessage:
      "Cześć! 🎯 Optymalizacja wydajności to sztuka znajdowania wąskich gardeł i usprawniania procesów biznesowych. Pomagam firmom zwiększyć efektywność poprzez analizę danych, usprawnienie przepływów pracy i implementację inteligentnych rozwiązań. W jakim obszarze Twojego biznesu widzisz największy potencjał do optymalizacji?",
  },
]

export function ServiceCards() {
  const [activeModal, setActiveModal] = useState<ServiceType>(null)

  return (
    <>
      <div className="grid md:grid-cols-3 gap-12">
        {SERVICES.map((service) => {
          const IconComponent = service.icon
          return (
            <Card
              key={service.id}
              className="group relative p-8 text-center border border-gray-100 bg-white hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => setActiveModal(service.id)}
            >
              <div className="w-12 h-12 mx-auto mb-6" aria-hidden="true">
                <IconComponent className="h-12 w-12 text-yellow-500" />
              </div>
              <h4 className="text-xl font-medium mb-4 text-black font-sans">{service.title}</h4>
              <p className="text-gray-600 leading-relaxed mb-6 font-sans">{service.description}</p>

              {/* Hover Button */}
              <div className="absolute inset-x-0 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  onClick={() => setActiveModal(service.id)}
                  size="sm"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium font-sans"
                  aria-label={`Wyjaśnij więcej: ${service.title}`}
                >
                  <MessageCircle className="h-4 w-4 mr-2" aria-hidden="true" />
                  Wyjaśnij więcej
                </Button>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Chatbot Modals */}
      {SERVICES.map((service) => (
        <ChatbotModal
          key={service.id}
          isOpen={activeModal === service.id}
          onClose={() => setActiveModal(null)}
          title={service.title}
          initialMessage={service.initialMessage}
        />
      ))}
    </>
  )
}
