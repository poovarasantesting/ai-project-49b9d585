import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { LoginForm } from "./components/LoginForm";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<div className="p-8 text-center">Dashboard (To be implemented)</div>} />
        <Route path="/forgot-password" element={<div className="p-8 text-center">Forgot Password (To be implemented)</div>} />
        <Route path="/register" element={<div className="p-8 text-center">Register (To be implemented)</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;