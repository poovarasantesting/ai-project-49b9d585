import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ChevronRight, CreditCard, Lock, MapPin, ShoppingBag, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

// Mock cart items
const cartItems = [
  { id: 1, name: "Classic White T-Shirt", price: 29.99, quantity: 1, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&auto=format&fit=crop" },
  { id: 2, name: "Slim Fit Jeans", price: 59.99, quantity: 1, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&auto=format&fit=crop" },
];

export default function Checkout() {
  const [step, setStep] = useState<"shipping" | "payment" | "review">("shipping");
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const { toast } = useToast();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = shippingMethod === "express" ? 15.99 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === "shipping") {
      setStep("payment");
      window.scrollTo(0, 0);
    } else if (step === "payment") {
      setStep("review");
      window.scrollTo(0, 0);
    } else {
      toast({
        title: "Order placed successfully!",
        description: "Your order has been placed and will be shipped soon.",
        variant: "default",
      });
      // Redirect to confirmation page
      setTimeout(() => navigate("/"), 1500);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>

      {/* Checkout Progress */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className={`rounded-full p-2 ${step === "shipping" || step === "payment" || step === "review" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
            <MapPin className="h-5 w-5" />
          </div>
          <span className="font-medium text-sm sm:text-base">Shipping</span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          
          <div className={`rounded-full p-2 ${step === "payment" || step === "review" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
            <CreditCard className="h-5 w-5" />
          </div>
          <span className="font-medium text-sm sm:text-base">Payment</span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          
          <div className={`rounded-full p-2 ${step === "review" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
            <Check className="h-5 w-5" />
          </div>
          <span className="font-medium text-sm sm:text-base">Review</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Checkout Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>
                {step === "shipping" && "Shipping Information"}
                {step === "payment" && "Payment Details"}
                {step === "review" && "Order Review"}
              </CardTitle>
              <CardDescription>
                {step === "shipping" && "Enter your shipping address and delivery preferences"}
                {step === "payment" && "Select your payment method and enter details"}
                {step === "review" && "Review your order before confirming"}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit}>
                {step === "shipping" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" required />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john.doe@example.com" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" placeholder="123 Main St" required />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="New York" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input id="state" placeholder="NY" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input id="zip" placeholder="10001" required />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="(123) 456-7890" required />
                    </div>
                    
                    <div className="space-y-3">
                      <Label>Shipping Method</Label>
                      <RadioGroup defaultValue={shippingMethod} onValueChange={setShippingMethod}>
                        <div className="flex items-center space-x-2 border rounded-md p-3">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label htmlFor="standard" className="flex-1 cursor-pointer">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <Truck className="h-4 w-4" />
                                <span>Standard Shipping</span>
                              </div>
                              <span className="font-medium">$5.99</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Delivery in 3-5 business days</p>
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2 border rounded-md p-3">
                          <RadioGroupItem value="express" id="express" />
                          <Label htmlFor="express" className="flex-1 cursor-pointer">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <Truck className="h-4 w-4" />
                                <span>Express Shipping</span>
                              </div>
                              <span className="font-medium">$15.99</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Delivery in 1-2 business days</p>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                )}
                
                {step === "payment" && (
                  <div className="space-y-6">
                    <Tabs defaultValue="credit-card" onValueChange={setPaymentMethod}>
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="credit-card">Credit Card</TabsTrigger>
                        <TabsTrigger value="paypal">PayPal</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="credit-card" className="space-y-6 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input id="cardName" placeholder="John Doe" required />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" required />
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Lock className="h-4 w-4" />
                          <span>Your payment information is encrypted and secure.</span>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="paypal" className="pt-4">
                        <div className="text-center p-6 space-y-4">
                          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                            <span>P</span>
                          </div>
                          <p>You will be redirected to PayPal to complete your payment.</p>
                          <Button type="button" className="w-full">
                            Continue with PayPal
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                    
                    <div className="space-y-2">
                      <Label htmlFor="billingAddress">Billing Address</Label>
                      <RadioGroup defaultValue="same">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="same" id="same" />
                          <Label htmlFor="same">Same as shipping address</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="different" id="different" />
                          <Label htmlFor="different">Use a different billing address</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                )}
                
                {step === "review" && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Shipping Address</h3>
                      <div className="bg-muted p-3 rounded-md">
                        <p>John Doe</p>
                        <p>123 Main St</p>
                        <p>New York, NY 10001</p>
                        <p>United States</p>
                        <p>john.doe@example.com</p>
                        <p>(123) 456-7890</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Payment Method</h3>
                      <div className="bg-muted p-3 rounded-md flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        <span>Credit Card ending in 3456</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Items</h3>
                      <div className="space-y-3">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex gap-4 border-b pb-3">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-16 h-16 object-cover rounded-md"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                              <p className="font-medium">${item.price.toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Shipping Method</h3>
                      <div className="bg-muted p-3 rounded-md flex items-center gap-2">
                        <Truck className="h-5 w-5" />
                        <div>
                          <p>{shippingMethod === "express" ? "Express Shipping" : "Standard Shipping"}</p>
                          <p className="text-sm text-muted-foreground">
                            {shippingMethod === "express" 
                              ? "Delivery in 1-2 business days" 
                              : "Delivery in 3-5 business days"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="mt-8 flex justify-between">
                  {step !== "shipping" && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setStep(step === "payment" ? "shipping" : "payment");
                        window.scrollTo(0, 0);
                      }}
                    >
                      Back
                    </Button>
                  )}
                  <Button type="submit" className="ml-auto">
                    {step === "shipping" && "Continue to Payment"}
                    {step === "payment" && "Review Order"}
                    {step === "review" && "Place Order"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                <span>Order Summary</span>
              </CardTitle>
              <CardDescription>
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded bg-muted relative overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium truncate max-w-[150px]">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col space-y-2">
              <div className="flex items-center justify-center w-full text-sm text-muted-foreground">
                <Lock className="h-4 w-4 mr-1" />
                <span>Secure Checkout</span>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}