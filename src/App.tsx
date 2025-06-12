import { BrowserRouter, Routes, Route } from "react-router-dom";
import DiagramEditor from "./pages/DiagramEditor";
import DiagramsOverview from "./pages/DiagramsOverview";
import { Toaster } from "./components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DiagramsOverview />} />
          <Route path="/editor/:id" element={<DiagramEditor />} />
          <Route path="/editor" element={<DiagramEditor />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;