"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ChatInterface() {
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<{ role: "user" | "system"; content: string }[]>([
    {
      role: "system",
      content:
        "Welcome to our product database chat! You can ask questions like:\n- Find SKU DB341-ZEB-0\n- Show accessories under $10\n- Show me bikinis",
    },
  ])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!message.trim()) return

    const userMessage = message
    setMessage("")
    setChatHistory((prev) => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      })

      const data = await response.json()

      setChatHistory((prev) => [
        ...prev,
        { role: "system", content: data.response || "Sorry, I couldn't process your request." },
      ])
    } catch (error) {
      console.error("Error sending message:", error)
      setChatHistory((prev) => [
        ...prev,
        { role: "system", content: "Sorry, there was an error processing your request." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Product Database Chat</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-h-[400px] overflow-y-auto">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              msg.role === "user" ? "bg-primary text-primary-foreground ml-auto max-w-[80%]" : "bg-muted max-w-[80%]"
            }`}
          >
            {msg.content.split("\n").map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        ))}
        {isLoading && (
          <div className="bg-muted p-3 rounded-lg max-w-[80%]">
            <p>Thinking...</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input
            placeholder="Ask about products..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
