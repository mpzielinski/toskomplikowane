"use client"

import { Button } from "@/components/ui/button"

export function Header() {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="border-b border-gray-100/50 backdrop-blur-sm bg-white/80 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium text-black font-serif">To Skomplikowane</h1>
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-black" onClick={scrollToContact}>
            Kontakt
          </Button>
        </div>
      </div>
    </header>
  )
}
