import { LoginForm } from "./components/LoginForm";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <LoginForm />
      <Toaster />
    </div>
  );
}

export default App;