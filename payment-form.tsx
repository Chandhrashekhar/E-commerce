"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CreditCard, Calendar, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { CartItem } from "@/types"

const paymentFormSchema = z.object({
  cardName: z.string().min(3, { message: "Name must be at least 3 characters" }),
  cardNumber: z
    .string()
    .min(16, { message: "Card number must be 16 digits" })
    .max(19, { message: "Card number must be 16-19 digits" })
    .regex(/^[0-9\s-]+$/, { message: "Card number must contain only digits, spaces, or dashes" }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, { message: "Expiry date must be in MM/YY format" }),
  cvv: z
    .string()
    .min(3, { message: "CVV must be 3-4 digits" })
    .max(4, { message: "CVV must be 3-4 digits" })
    .regex(/^[0-9]+$/, { message: "CVV must contain only digits" }),
})

type PaymentFormValues = z.infer<typeof paymentFormSchema>

interface PaymentFormProps {
  items: CartItem[]
  total: number
  onSuccess: () => void
}

export default function PaymentForm({ items, total, onSuccess }: PaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  })

  const onSubmit = async (data: PaymentFormValues) => {
    setIsProcessing(true)

    try {
      // Simulate payment processing delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real app, you would send the payment data to a payment processor
      // For demo purposes, we'll just simulate a successful payment

      // Clear cart from localStorage
      localStorage.setItem("cart", JSON.stringify([]))

      // Call the success callback
      onSuccess()

      // Redirect to success page
      router.push("/checkout/success")
    } catch (error) {
      console.error("Payment processing error:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
        <CardDescription>Enter your card information to complete your purchase.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="cardName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name on Card</FormLabel>
                  <FormControl>
                    <Input placeholder="John Smith" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="4111 1111 1111 1111"
                        {...field}
                        onChange={(e) => {
                          // Format card number with spaces every 4 digits
                          const value = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
                          const formattedValue = value.replace(/(.{4})/g, "$1 ").trim()
                          field.onChange(formattedValue)
                        }}
                        maxLength={19}
                      />
                      <CreditCard className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="MM/YY"
                          {...field}
                          onChange={(e) => {
                            let value = e.target.value.replace(/[^\d]/g, "")
                            if (value.length > 2) {
                              value = `${value.slice(0, 2)}/${value.slice(2, 4)}`
                            }
                            field.onChange(value)
                          }}
                          maxLength={5}
                        />
                        <Calendar className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVV</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input placeholder="123" {...field} type="password" maxLength={4} />
                        <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>${(total * 0.08).toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${(total + total * 0.08).toFixed(2)}</span>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isProcessing}>
              {isProcessing ? "Processing..." : "Pay Now"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center text-xs text-muted-foreground">
        <p>Your payment information is secure. We use encryption to protect your data.</p>
      </CardFooter>
    </Card>
  )
}
