import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

// Test user credentials
export const TEST_USERS = [
  { id: 1, username: "admin", password: "admin123", role: "Administrator" },
  { id: 2, username: "user", password: "user123", role: "Regular User" },
  { id: 3, username: "guest", password: "guest123", role: "Guest" },
];

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user = TEST_USERS.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        toast({
          title: "Login successful",
          description: `Welcome back, ${user.username}! (${user.role})`,
        });
        
        // Store user in localStorage (in a real app, you would use a more secure method)
        localStorage.setItem("currentUser", JSON.stringify(user));
        
        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        toast({
          title: "Login failed",
          description: "Invalid username or password. Try one of the test accounts.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log in"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <div className="text-sm text-muted-foreground mt-2">
          <strong>Test credentials:</strong>
          <ul className="list-disc list-inside mt-1">
            {TEST_USERS.map((user) => (
              <li key={user.id}>
                <span className="font-medium">{user.role}:</span> {user.username} / {user.password}
              </li>
            ))}
          </ul>
        </div>
      </CardFooter>
    </Card>
  );
}