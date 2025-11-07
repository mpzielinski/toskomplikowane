"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Send } from "lucide-react"

interface FormData {
  name: string
  email: string
  company: string
  message: string
}

interface FormStatus {
  type: "idle" | "loading" | "success" | "error"
  message?: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  const [status, setStatus] = useState<FormStatus>({ type: "idle" })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus({ type: "loading" })

    try {
      // Validate form data
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        setStatus({ type: "error", message: "Proszę uzupełnić wszystkie wymagane pola" })
        return
      }

      // TODO: Integrate with your backend/email service
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setStatus({ type: "success", message: "Dziękujemy! Wkrótce się skontaktujemy." })
      setFormData({ name: "", email: "", company: "", message: "" })
      setTimeout(() => setStatus({ type: "idle" }), 3000)
    } catch (error) {
      setStatus({ type: "error", message: "Coś poszło nie tak. Spróbuj ponownie." })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Card className="p-8 bg-white text-black max-w-2xl mx-auto border border-gray-100">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2 text-black font-sans">
              Imię i nazwisko <span aria-label="wymagane">*</span>
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              aria-required="true"
              value={formData.name}
              onChange={handleChange}
              className="border-gray-200 focus:border-yellow-500 focus:ring-yellow-500 font-sans"
              placeholder="Jan Kowalski"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-black font-sans">
              Email <span aria-label="wymagane">*</span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              aria-required="true"
              value={formData.email}
              onChange={handleChange}
              className="border-gray-200 focus:border-yellow-500 focus:ring-yellow-500 font-sans"
              placeholder="jan@firma.pl"
            />
          </div>
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-2 text-black font-sans">
            Nazwa firmy
          </label>
          <Input
            id="company"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            className="border-gray-200 focus:border-yellow-500 focus:ring-yellow-500 font-sans"
            placeholder="Twoja Firma Sp. z o.o."
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2 text-black font-sans">
            Wiadomość <span aria-label="wymagane">*</span>
          </label>
          <Textarea
            id="message"
            name="message"
            required
            aria-required="true"
            value={formData.message}
            onChange={handleChange}
            className="border-gray-200 focus:border-yellow-500 focus:ring-yellow-500 min-h-[120px] font-sans"
            placeholder="Opowiedz nam o swoim biznesie i jak możemy pomóc..."
          />
        </div>

        {status.type === "success" && (
          <div className="p-4 bg-green-50 border border-green-200 rounded text-green-800 font-sans">
            {status.message}
          </div>
        )}

        {status.type === "error" && (
          <div className="p-4 bg-red-50 border border-red-200 rounded text-red-800 font-sans">{status.message}</div>
        )}

        <Button
          type="submit"
          disabled={status.type === "loading"}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 font-medium disabled:opacity-50 font-sans"
          size="lg"
        >
          {status.type === "loading" ? "Wysyłanie..." : "Wyślij wiadomość"}
          {status.type !== "loading" && <Send className="ml-2 h-4 w-4" />}
        </Button>
      </form>
    </Card>
  )
}
