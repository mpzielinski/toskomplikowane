"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Zod schema for form validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Imię musi mieć co najmniej 2 znaki" }),
  email: z.string().email({ message: "Nieprawidłowy adres email" }),
  company: z.string().optional(),
  message: z.string().min(10, { message: "Wiadomość musi mieć co najmniej 10 znaków" }),
})

type FormData = z.infer<typeof formSchema>

interface FormStatus {
  type: "idle" | "loading" | "success" | "error"
  message?: string
}

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>({ type: "idle" })
  const { toast } = useToast()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  })

  const onSubmit = async (data: FormData) => {
    setStatus({ type: "loading" })

    try {
      // Get n8n webhook URL from environment variable
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL

      if (!webhookUrl) {
        console.error("N8N webhook URL not configured")
        setStatus({ type: "error", message: "Konfiguracja formularza jest nieprawidłowa" })
        toast({
          variant: "destructive",
          title: "Błąd",
          description: "Nie można wysłać wiadomości. Skontaktuj się bezpośrednio.",
        })
        return
      }

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      setStatus({ type: "success", message: "Dziękujemy! Wkrótce się skontaktujemy." })
      toast({
        title: "Wiadomość wysłana!",
        description: "Dziękujemy za kontakt. Odpowiemy tak szybko, jak to możliwe.",
      })

      form.reset()
      setTimeout(() => setStatus({ type: "idle" }), 3000)
    } catch (error) {
      console.error("Form submission error:", error)
      setStatus({ type: "error", message: "Coś poszło nie tak. Spróbuj ponownie." })
      toast({
        variant: "destructive",
        title: "Błąd wysyłania",
        description: "Nie udało się wysłać wiadomości. Spróbuj ponownie za chwilę.",
      })
    }
  }

  return (
    <Card className="p-8 bg-white text-black max-w-2xl mx-auto border border-gray-100">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black font-sans">
                    Imię i nazwisko <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Jan Kowalski"
                      className="border-gray-200 focus:border-yellow-500 focus:ring-yellow-500 font-sans"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black font-sans">
                    Email <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="jan@firma.pl"
                      className="border-gray-200 focus:border-yellow-500 focus:ring-yellow-500 font-sans"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black font-sans">Nazwa firmy</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Twoja Firma Sp. z o.o."
                    className="border-gray-200 focus:border-yellow-500 focus:ring-yellow-500 font-sans"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black font-sans">
                  Wiadomość <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Opowiedz nam o swoim biznesie i jak możemy pomóc..."
                    className="border-gray-200 focus:border-yellow-500 focus:ring-yellow-500 min-h-[120px] font-sans"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {status.type === "success" && (
            <div className="p-4 bg-green-50 border border-green-200 rounded text-green-800 font-sans">
              {status.message}
            </div>
          )}

          {status.type === "error" && (
            <div className="p-4 bg-red-50 border border-red-200 rounded text-red-800 font-sans">
              {status.message}
            </div>
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
      </Form>
    </Card>
  )
}
