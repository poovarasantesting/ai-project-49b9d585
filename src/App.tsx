import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import TaskGenerator from "@/pages/TaskGenerator";

function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task-generator" element={<TaskGenerator />} />
        </Routes>
      </main>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;