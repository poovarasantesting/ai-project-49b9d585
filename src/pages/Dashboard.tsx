import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TEST_USERS } from "@/components/LoginForm";

type User = typeof TEST_USERS[0];

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Dashboard</CardTitle>
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Welcome, {user.username}!</h2>
              <p className="text-muted-foreground">
                You are logged in as: <span className="font-medium">{user.role}</span>
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Test User Documentation</h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Username</th>
                    <th className="text-left py-2">Password</th>
                    <th className="text-left py-2">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {TEST_USERS.map((testUser) => (
                    <tr key={testUser.id} className="border-b">
                      <td className="py-2">{testUser.username}</td>
                      <td className="py-2">{testUser.password}</td>
                      <td className="py-2">{testUser.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}