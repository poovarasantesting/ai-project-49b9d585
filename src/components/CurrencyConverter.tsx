import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { ArrowRightLeft, RefreshCw } from "lucide-react";
import { useToast } from "./ui/use-toast";

// Currency data with codes and symbols
const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
];

// Mock exchange rates (in a real app, you would fetch these from an API)
const exchangeRates = {
  USD: { EUR: 0.93, GBP: 0.79, JPY: 153.89, CAD: 1.36, AUD: 1.52, CHF: 0.91, CNY: 7.24, INR: 83.47, BRL: 5.06 },
  EUR: { USD: 1.08, GBP: 0.85, JPY: 166.25, CAD: 1.47, AUD: 1.64, CHF: 0.98, CNY: 7.82, INR: 90.13, BRL: 5.47 },
  GBP: { USD: 1.27, EUR: 1.18, JPY: 195.81, CAD: 1.73, AUD: 1.93, CHF: 1.16, CNY: 9.21, INR: 106.16, BRL: 6.44 },
  JPY: { USD: 0.0065, EUR: 0.0060, GBP: 0.0051, CAD: 0.0088, AUD: 0.0099, CHF: 0.0059, CNY: 0.047, INR: 0.54, BRL: 0.033 },
  CAD: { USD: 0.73, EUR: 0.68, GBP: 0.58, JPY: 113.08, AUD: 1.11, CHF: 0.67, CNY: 5.32, INR: 61.28, BRL: 3.72 },
  AUD: { USD: 0.66, EUR: 0.61, GBP: 0.52, JPY: 101.40, CAD: 0.90, CHF: 0.60, CNY: 4.77, INR: 54.99, BRL: 3.34 },
  CHF: { USD: 1.10, EUR: 1.02, GBP: 0.86, JPY: 169.56, CAD: 1.50, AUD: 1.67, CNY: 7.97, INR: 91.89, BRL: 5.58 },
  CNY: { USD: 0.14, EUR: 0.13, GBP: 0.11, JPY: 21.26, CAD: 0.19, AUD: 0.21, CHF: 0.13, INR: 11.53, BRL: 0.70 },
  INR: { USD: 0.012, EUR: 0.011, GBP: 0.0094, JPY: 1.84, CAD: 0.016, AUD: 0.018, CHF: 0.011, CNY: 0.087, BRL: 0.061 },
  BRL: { USD: 0.20, EUR: 0.18, GBP: 0.16, JPY: 30.41, CAD: 0.27, AUD: 0.30, CHF: 0.18, CNY: 1.43, INR: 16.49 }
};

// Add reflexive rates (1:1 for same currency)
currencies.forEach(currency => {
  if (!exchangeRates[currency.code]) {
    exchangeRates[currency.code] = {};
  }
  
  currencies.forEach(targetCurrency => {
    if (currency.code === targetCurrency.code) {
      exchangeRates[currency.code][targetCurrency.code] = 1;
    }
  });
});

export function CurrencyConverter() {
  const [amount, setAmount] = useState<string>("1");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [convertedAmount, setConvertedAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  // Get symbol for a currency code
  const getSymbol = (code: string) => {
    return currencies.find(c => c.code === code)?.symbol || "";
  };

  // Handle conversion
  const handleConvert = () => {
    if (!amount || isNaN(Number(amount))) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid number",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      try {
        const rate = exchangeRates[fromCurrency][toCurrency];
        const result = (parseFloat(amount) * rate).toFixed(4);
        setConvertedAmount(result);
        
        toast({
          title: "Conversion complete",
          description: `${amount} ${fromCurrency} = ${result} ${toCurrency}`,
        });
      } catch (error) {
        toast({
          title: "Conversion failed",
          description: "Could not perform the conversion. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }, 600);
  };

  // Swap currencies
  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setConvertedAmount("");
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Currency Converter</CardTitle>
          <CardDescription>Convert between world currencies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setConvertedAmount("");
              }}
              className="text-lg"
              min="0"
              step="any"
            />
          </div>
          
          <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-center">
            <div className="space-y-2">
              <Label htmlFor="from-currency">From</Label>
              <Select 
                value={fromCurrency} 
                onValueChange={(value) => {
                  setFromCurrency(value);
                  setConvertedAmount("");
                }}
              >
                <SelectTrigger id="from-currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={`from-${currency.code}`} value={currency.code}>
                      {currency.symbol} {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleSwap}
              className="mt-6"
            >
              <ArrowRightLeft className="h-5 w-5" />
            </Button>
            
            <div className="space-y-2">
              <Label htmlFor="to-currency">To</Label>
              <Select 
                value={toCurrency} 
                onValueChange={(value) => {
                  setToCurrency(value);
                  setConvertedAmount("");
                }}
              >
                <SelectTrigger id="to-currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={`to-${currency.code}`} value={currency.code}>
                      {currency.symbol} {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            onClick={handleConvert} 
            className="w-full py-6 text-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                Converting...
              </>
            ) : (
              "Convert"
            )}
          </Button>
          
          {convertedAmount && (
            <div className="mt-6 text-center">
              <div className="text-muted-foreground mb-2">Result</div>
              <div className="text-2xl font-bold">
                {getSymbol(toCurrency)} {convertedAmount} {toCurrency}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                1 {fromCurrency} = {exchangeRates[fromCurrency][toCurrency]} {toCurrency}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}