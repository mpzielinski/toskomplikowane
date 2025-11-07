"use client"

import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, X } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "bot" | "user"
  timestamp: Date
}

interface ChatbotModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  initialMessage: string
}

const BOT_RESPONSES: Record<string, string[]> = {
  "Dedykowane Agenty AI": [
    "Świetne pytanie! Agenty AI mogą być zaprogramowane do konkretnych zadań w Twojej branży. Na przykład, agent może automatycznie odpowiadać na zapytania klientów, analizować dokumenty czy zarządzać harmonogramem.",
    "To zależy od specyfiki Twojego biznesu. Agenty AI najlepiej sprawdzają się w zadaniach powtarzalnych, które wymagają szybkich decyzji na podstawie danych.",
    "Koszt implementacji agenta AI zależy od złożoności zadań. Zazwyczaj inwestycja zwraca się w ciągu 3-6 miesięcy dzięki oszczędności czasu i zwiększonej efektywności.",
  ],
  "Automatyzacja Procesów": [
    "Automatyzacja może objąć wiele obszarów - od prostego przekazywania e-maili, przez generowanie raportów, po zarządzanie zapasami. Kluczem jest identyfikacja procesów, które zabierają Ci najwięcej czasu.",
    "Najlepsze rezultaty daje automatyzacja zadań, które są powtarzalne, oparte na regułach i czasochłonne. Mogę pomóc Ci zidentyfikować takie procesy w Twojej firmie.",
    "Czas wdrożenia zależy od złożoności procesów, ale proste automatyzacje można uruchomić już w ciągu tygodnia. Bardziej zaawansowane rozwiązania mogą wymagać 2-4 tygodni.",
  ],
  "Optymalizacja Wydajności": [
    "Optymalizacja wydajności zaczyna się od analizy obecnych procesów. Używamy narzędzi do monitorowania i analizy, aby znaleźć miejsca, gdzie można zaoszczędzić czas i zasoby.",
    "Typowe obszary optymalizacji to: przepływ informacji między działami, zarządzanie projektami, obsługa klienta i zarządzanie zasobami. Każda firma ma swoje unikalne wyzwania.",
    "Rezultaty optymalizacji są zazwyczaj widoczne już po kilku tygodniach. Nasze rozwiązania często prowadzą do 30-50% zwiększenia efektywności w zoptymalizowanych procesach.",
  ],
}

const RESPONSE_DELAY_MIN = 800
const RESPONSE_DELAY_MAX = 1200

export function ChatbotModal({ isOpen, onClose, title, initialMessage }: ChatbotModalProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Initialize with bot's initial message when modal opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "initial",
          text: initialMessage,
          sender: "bot",
          timestamp: new Date(),
        },
      ])
    }
  }, [isOpen, messages.length, initialMessage])

  // Reset messages when modal closes
  useEffect(() => {
    if (!isOpen) {
      setMessages([])
      setInputValue("")
    }
  }, [isOpen])

  useEffect(() => {
    const scrollContainer = scrollAreaRef.current?.querySelector("[data-radix-scroll-area-viewport]")
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    const delayMs = RESPONSE_DELAY_MIN + Math.random() * (RESPONSE_DELAY_MAX - RESPONSE_DELAY_MIN)
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(title),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, delayMs)
  }

  const getBotResponse = (serviceTitle: string): string => {
    const responses = BOT_RESPONSES[serviceTitle] || BOT_RESPONSES["Dedykowane Agenty AI"]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[600px] p-0 bg-white border border-gray-200">
        <DialogHeader className="p-6 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center" aria-hidden="true">
                <Bot className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <DialogTitle className="text-lg font-medium text-black">{title}</DialogTitle>
                <p className="text-sm text-gray-600">Asystent AI</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} aria-label="Zamknij czat">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex flex-col h-[500px]">
          <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 ${
                    message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                  }`}
                  role="article"
                  aria-label={`Wiadomość od ${message.sender === "bot" ? "bota" : "użytkownika"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === "bot" ? "bg-yellow-100" : "bg-gray-100"
                    }`}
                    aria-hidden="true"
                  >
                    {message.sender === "bot" ? (
                      <Bot className="h-4 w-4 text-yellow-600" />
                    ) : (
                      <User className="h-4 w-4 text-gray-600" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg font-sans ${
                      message.sender === "bot" ? "bg-gray-50 text-gray-800" : "bg-yellow-500 text-black"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-start space-x-3" aria-live="polite" aria-label="Bot pisze">
                  <div
                    className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0"
                    aria-hidden="true"
                  >
                    <Bot className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-6 pt-4 border-t border-gray-100">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Zadaj pytanie o tę usługę..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                aria-label="Wpisz swoją wiadomość"
                className="flex-1 border-gray-200 focus:border-yellow-500 focus:ring-yellow-500"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                aria-label="Wyślij wiadomość"
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
