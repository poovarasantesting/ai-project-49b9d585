import { LoginForm } from "@/components/auth/LoginForm";
import { Toaster } from "@/components/ui/toaster";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Welcome Back</h1>
        <LoginForm />
      </div>
      <Toaster />
    </div>
  );
}