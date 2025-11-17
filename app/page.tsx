import { ContactForm } from "@/components/contact-form"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Users } from "lucide-react"
import { ServiceCards } from "@/components/service-cards"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-32 lg:py-48">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl lg:text-7xl font-light text-black mb-8 leading-tight tracking-tight font-serif">
              Uprość swój biznes
              <br />z pomocą AI
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed font-sans">
              Pomagamy małym firmom wykorzystać potencjał sztucznej inteligencji poprzez optymalizację procesów.
            </p>
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 font-medium font-sans">
              Rozpocznij transformację
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-4xl font-light text-center mb-20 text-black font-serif">Jak możemy pomóc</h3>
            <ServiceCards />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-4xl font-light mb-8 text-black font-serif">Dlaczego To Skomplikowane?</h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed font-sans">
                  Wiemy, że wdrażanie nowych technologii może wydawać się skomplikowane. Dlatego jesteśmy tutaj, aby
                  uprościć ten proces i pokazać, jak AI może rzeczywiście ułatwić prowadzenie biznesu.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed font-sans">
                  Specjalizujemy się w tworzeniu prostych, ale skutecznych rozwiązań dla małych i średnich
                  przedsiębiorstw.
                </p>
              </div>
              <Card className="p-8 bg-white border border-gray-100">
                <div className="flex items-center mb-6">
                  <Users className="h-6 w-6 text-yellow-500 mr-3" />
                  <span className="font-medium text-black font-sans">Dla małych firm</span>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6 font-sans">
                  Rozumiemy wyzwania małych biznesów i tworzymy rozwiązania dostosowane do Waszych potrzeb i budżetu.
                </p>
                <div className="space-y-2 text-sm text-gray-600 font-sans">
                  <div>• Dostępne ceny</div>
                  <div>• Szybkie wdrożenie</div>
                  <div>• Pełne wsparcie</div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-black text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-light mb-6 font-serif">Gotowy na zmianę?</h3>
              <p className="text-gray-300 text-lg font-sans">
                Skontaktuj się z nami i omówmy, jak możemy pomóc Twojemu biznesowi.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center text-gray-600 font-sans">
            <p>&copy; {new Date().getFullYear()} To Skomplikowane. Wszystkie prawa zastrzeżone.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
