import { useState } from "react";
import { Button } from "./ui/button";
import { X, Divide, Minus, Plus, Equal } from "lucide-react";

export function Calculator() {
  const [display, setDisplay] = useState("0");
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay("0.");
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const clearDisplay = () => {
    setDisplay("0");
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (firstOperand: number, secondOperand: number, operator: string) => {
    switch (operator) {
      case "+":
        return firstOperand + secondOperand;
      case "-":
        return firstOperand - secondOperand;
      case "×":
        return firstOperand * secondOperand;
      case "÷":
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  const handleEquals = () => {
    if (firstOperand === null || operator === null) {
      return;
    }

    const inputValue = parseFloat(display);
    const result = calculate(firstOperand, inputValue, operator);
    setDisplay(String(result));
    setFirstOperand(result);
    setOperator(null);
    setWaitingForSecondOperand(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-xs">
      <div className="p-4 bg-gray-800 text-right">
        <div className="text-3xl font-light text-white overflow-auto h-16 flex items-center justify-end">
          {display}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-1 p-2 bg-gray-100">
        <Button
          variant="outline"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-lg h-14"
          onClick={clearDisplay}
        >
          C
        </Button>
        <Button
          variant="outline"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-lg h-14"
          onClick={() => setDisplay(display.slice(0, -1) || "0")}
        >
          ←
        </Button>
        <Button
          variant="outline"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-lg h-14"
          onClick={() => setDisplay(String(parseFloat(display) * -1))}
        >
          +/-
        </Button>
        <Button
          variant="outline"
          className="bg-amber-500 hover:bg-amber-600 text-white text-lg h-14"
          onClick={() => performOperation("÷")}
        >
          <Divide size={20} />
        </Button>

        {[7, 8, 9].map((num) => (
          <Button
            key={num}
            variant="outline"
            className="bg-gray-50 hover:bg-gray-200 text-gray-800 text-lg h-14"
            onClick={() => inputDigit(num.toString())}
          >
            {num}
          </Button>
        ))}
        <Button
          variant="outline"
          className="bg-amber-500 hover:bg-amber-600 text-white text-lg h-14"
          onClick={() => performOperation("×")}
        >
          <X size={20} />
        </Button>

        {[4, 5, 6].map((num) => (
          <Button
            key={num}
            variant="outline"
            className="bg-gray-50 hover:bg-gray-200 text-gray-800 text-lg h-14"
            onClick={() => inputDigit(num.toString())}
          >
            {num}
          </Button>
        ))}
        <Button
          variant="outline"
          className="bg-amber-500 hover:bg-amber-600 text-white text-lg h-14"
          onClick={() => performOperation("-")}
        >
          <Minus size={20} />
        </Button>

        {[1, 2, 3].map((num) => (
          <Button
            key={num}
            variant="outline"
            className="bg-gray-50 hover:bg-gray-200 text-gray-800 text-lg h-14"
            onClick={() => inputDigit(num.toString())}
          >
            {num}
          </Button>
        ))}
        <Button
          variant="outline"
          className="bg-amber-500 hover:bg-amber-600 text-white text-lg h-14"
          onClick={() => performOperation("+")}
        >
          <Plus size={20} />
        </Button>

        <Button
          variant="outline"
          className="bg-gray-50 hover:bg-gray-200 text-gray-800 text-lg h-14 col-span-2"
          onClick={() => inputDigit("0")}
        >
          0
        </Button>
        <Button
          variant="outline"
          className="bg-gray-50 hover:bg-gray-200 text-gray-800 text-lg h-14"
          onClick={inputDecimal}
        >
          .
        </Button>
        <Button
          variant="outline"
          className="bg-amber-500 hover:bg-amber-600 text-white text-lg h-14"
          onClick={handleEquals}
        >
          <Equal size={20} />
        </Button>
      </div>
    </div>
  );
}