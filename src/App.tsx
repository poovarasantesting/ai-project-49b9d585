import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Calendar } from "./pages/Calendar";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Calendar />} />
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}