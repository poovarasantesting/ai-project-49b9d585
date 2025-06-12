import { useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { X, Divide, Minus, Plus, Equal, Delete } from "lucide-react";
import { cn } from "../lib/utils";

export function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [resetDisplay, setResetDisplay] = useState(false);
  const { toast } = useToast();

  const handleNumberClick = (number: string) => {
    if (display === "0" || resetDisplay) {
      setDisplay(number);
      setResetDisplay(false);
    } else if (display.length < 12) {
      // Limit input to prevent overflow
      setDisplay(display + number);
    } else {
      toast({
        description: "Maximum input length reached",
        variant: "destructive",
      });
    }
  };

  const handleDecimalClick = () => {
    if (resetDisplay) {
      setDisplay("0.");
      setResetDisplay(false);
      return;
    }
    
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleOperationClick = (op: string) => {
    if (previousValue === null) {
      setPreviousValue(parseFloat(display));
    } else if (operation) {
      const result = calculate();
      setPreviousValue(result);
      setDisplay(String(result));
    }
    
    setOperation(op);
    setResetDisplay(true);
  };

  const handleEqualsClick = () => {
    if (previousValue === null || operation === null) return;
    
    const result = calculate();
    setDisplay(String(result));
    setPreviousValue(null);
    setOperation(null);
    setResetDisplay(true);
  };

  const calculate = (): number => {
    const current = parseFloat(display);
    let result = 0;
    
    switch (operation) {
      case "+":
        result = previousValue! + current;
        break;
      case "-":
        result = previousValue! - current;
        break;
      case "×":
        result = previousValue! * current;
        break;
      case "÷":
        if (current === 0) {
          toast({
            description: "Cannot divide by zero",
            variant: "destructive",
          });
          return previousValue!;
        }
        result = previousValue! / current;
        break;
      default:
        return current;
    }
    
    // Handle decimal precision and rounding
    return Math.round(result * 1000000000) / 1000000000;
  };

  const handleClear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setResetDisplay(false);
  };

  const handleDelete = () => {
    if (display.length === 1 || (display.length === 2 && display.startsWith("-"))) {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const handlePercentage = () => {
    const value = parseFloat(display) / 100;
    setDisplay(String(value));
  };

  const handleSignChange = () => {
    if (display !== "0") {
      setDisplay(display.startsWith("-") ? display.slice(1) : "-" + display);
    }
  };

  return (
    <div className="bg-card border rounded-2xl shadow-lg overflow-hidden w-full max-w-[320px]">
      <div className="p-4 border-b bg-muted/30">
        <div className="text-right min-h-[60px] flex flex-col items-end justify-center">
          {operation && (
            <div className="text-sm text-muted-foreground mb-1">
              {previousValue} {operation}
            </div>
          )}
          <div className="text-3xl font-medium tracking-tighter overflow-x-auto max-w-full">
            {display}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-1 p-2">
        {/* Row 1 */}
        <Button
          variant="ghost"
          className="text-base font-medium aspect-square"
          onClick={handleClear}
        >
          C
        </Button>
        <Button
          variant="ghost" 
          className="text-base font-medium aspect-square"
          onClick={handleSignChange}
        >
          +/-
        </Button>
        <Button
          variant="ghost"
          className="text-base font-medium aspect-square"
          onClick={handlePercentage}
        >
          %
        </Button>
        <Button
          variant="ghost"
          className="text-base font-medium text-orange-500 aspect-square"
          onClick={() => handleOperationClick("÷")}
        >
          <Divide className="h-5 w-5" />
        </Button>
        
        {/* Row 2 */}
        <Button
          variant="ghost"
          className="text-base font-medium aspect-square"
          onClick={() => handleNumberClick("7")}
        >
          7
        </Button>
        <Button
          variant="ghost"
          className="text-base font-medium aspect-square"
          onClick={() => handleNumberClick("8")}
        >
          8
        </Button>
        <Button
          variant="ghost"
          className="text-base font-medium aspect-square"
          onClick={() => handleNumberClick("9")}
        >
          9
        </Button>
        <Button
          variant="ghost"
          className="text-base font-medium text-orange-500 aspect-square"
          onClick={() => handleOperationClick("×")}
        >
          <X className="h-5 w-5" />
        </Button>
        
        {/* Row 3 */}
        <Button
          variant="ghost"
          className="text-base font-medium aspect-square"
          onClick={() => handleNumberClick("4")}
        >
          4
        </Button>
        <Button
          variant="ghost"
          className="text-base font-medium aspect-square"
          onClick={() => handleNumberClick("5")}
        >
          5
        </Button>
        <Button
          variant="ghost"
          className="text-base font-medium aspect-square"
          onClick={() => handleNumberClick("6")}
        >
          6
        </Button>
        <Button
          variant="ghost"
          className="text-base font-medium text-orange-500 aspect-square"
          onClick={() => handleOperationClick("-")}
        >
          <Minus className="h-5 w-5" />
        </Button>
        
        {/* Row 4 */}
        <Button
          variant="ghost"
          className="text-base font-medium aspect-square"
          onClick={() => handleNumberClick("1")}
        >
          1
        </Button>
        <Button
          variant="ghost"
          className="text-base font-medium aspect-square"
          onClick={() => handleNumberClick("2")}
        >
          2
        </Button>
        <Button
          variant="ghost"
          className="text-base font-medium aspect-square"
          onClick={() => handleNumberClick("3")}
        >
          3
        </Button>
        <Button
          variant="ghost"
          className="text-base font-medium text-orange-500 aspect-square"
          onClick={() => handleOperationClick("+")}
        >
          <Plus className="h-5 w-5" />
        </Button>
        
        {/* Row 5 */}
        <Button
          variant="ghost"
          className="text-base font-medium aspect-square"
          onClick={handleDelete}
        >
          <Delete className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          className="text-base font-medium aspect-square"
          onClick={() => handleNumberClick("0")}
        >
          0
        </Button>
        <Button
          variant="ghost"
          className="text-base font-medium aspect-square"
          onClick={handleDecimalClick}
        >
          .
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "text-base font-medium aspect-square",
            "bg-orange-500 text-white hover:bg-orange-600 hover:text-white"
          )}
          onClick={handleEqualsClick}
        >
          <Equal className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}