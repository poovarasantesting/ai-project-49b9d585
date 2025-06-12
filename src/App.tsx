import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { CurrencyConverter } from "./components/CurrencyConverter";

function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<CurrencyConverter />} />
          </Routes>
        </div>
      </main>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;