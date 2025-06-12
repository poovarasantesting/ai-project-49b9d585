import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function Dashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    // Get user details
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear authentication
    localStorage.removeItem("isAuthenticated");
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    
    navigate("/login");
  };

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </div>
      
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Welcome, {user.name}!</h2>
        <p className="text-gray-600">
          You're now logged in with {user.email}.
        </p>
        
        <div className="mt-8">
          <h3 className="mb-2 text-lg font-medium">What's Next?</h3>
          <p className="text-gray-600">
            This is your personal dashboard. In a real application, you would see your personalized content here.
          </p>
        </div>
      </div>
    </div>
  );
}