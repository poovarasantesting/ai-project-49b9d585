import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function Calculator() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [hasResult, setHasResult] = useState(false);

  const handleNumberClick = (num: string) => {
    if (display === "0" || hasResult) {
      setDisplay(num);
      setHasResult(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperatorClick = (op: string) => {
    setExpression(display + op);
    setDisplay("0");
    setHasResult(false);
  };

  const handleEquals = () => {
    try {
      // Safely combine the expression with the current display
      const fullExpression = expression + display;
      // Use Function constructor to evaluate the expression
      const result = new Function(`return ${fullExpression}`)();
      setDisplay(String(result));
      setExpression("");
      setHasResult(true);
    } catch (error) {
      setDisplay("Error");
      setExpression("");
      setHasResult(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setExpression("");
    setHasResult(false);
  };

  const handleDecimal = () => {
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="bg-gray-800 rounded-t-lg">
        <CardTitle className="text-white">Calculator</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="bg-gray-100 p-4 mb-4 rounded-md text-right">
          {expression && (
            <div className="text-sm text-gray-500 h-6">{expression}</div>
          )}
          <div className="text-3xl font-medium overflow-hidden text-ellipsis">
            {display}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <Button
            variant="outline"
            onClick={handleClear}
            className="bg-red-100 hover:bg-red-200"
          >
            C
          </Button>
          <Button variant="outline" onClick={() => handleOperatorClick("/")}>/</Button>
          <Button variant="outline" onClick={() => handleOperatorClick("*")}>×</Button>
          <Button variant="outline" onClick={() => handleOperatorClick("-")}>−</Button>
          
          <Button variant="outline" onClick={() => handleNumberClick("7")}>7</Button>
          <Button variant="outline" onClick={() => handleNumberClick("8")}>8</Button>
          <Button variant="outline" onClick={() => handleNumberClick("9")}>9</Button>
          <Button 
            variant="outline" 
            onClick={() => handleOperatorClick("+")}
            className="row-span-2 h-full flex items-center justify-center bg-blue-100 hover:bg-blue-200"
          >
            +
          </Button>
          
          <Button variant="outline" onClick={() => handleNumberClick("4")}>4</Button>
          <Button variant="outline" onClick={() => handleNumberClick("5")}>5</Button>
          <Button variant="outline" onClick={() => handleNumberClick("6")}>6</Button>
          
          <Button variant="outline" onClick={() => handleNumberClick("1")}>1</Button>
          <Button variant="outline" onClick={() => handleNumberClick("2")}>2</Button>
          <Button variant="outline" onClick={() => handleNumberClick("3")}>3</Button>
          <Button 
            variant="outline" 
            onClick={handleEquals}
            className="row-span-2 h-full flex items-center justify-center bg-green-100 hover:bg-green-200"
          >
            =
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => handleNumberClick("0")}
            className="col-span-2"
          >
            0
          </Button>
          <Button variant="outline" onClick={handleDecimal}>.</Button>
        </div>
      </CardContent>
    </Card>
  );
}