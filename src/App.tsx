import { Toaster } from "@/components/ui/toaster";
import { RegisterForm } from "@/components/RegisterForm";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center p-4">
      <div className="container mx-auto">
        <RegisterForm />
      </div>
      <Toaster />
    </div>
  );
}