import { BrowserRouter, Routes, Route } from "react-router-dom";
import DiagramEditor from "./pages/DiagramEditor";
import Home from "./pages/Home";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<DiagramEditor />} />
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;