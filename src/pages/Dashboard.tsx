import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, UserCircle, ShieldAlert } from 'lucide-react';

export default function Dashboard() {
  const { user, logout, isAdmin } = useAuth();

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button variant="outline" onClick={logout} className="flex items-center">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserCircle className="w-5 h-5 mr-2" />
              User Profile
            </CardTitle>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Name:</span>
                <span>{user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Username:</span>
                <span>{user.username}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Role:</span>
                <span className="flex items-center">
                  {isAdmin && <ShieldAlert className="w-4 h-4 mr-1 text-amber-500" />}
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {isAdmin && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShieldAlert className="w-5 h-5 mr-2" />
                Admin Controls
              </CardTitle>
              <CardDescription>Special admin-only features</CardDescription>
            </CardHeader>
            <CardContent>
              <p>As an admin, you have access to all system features and user management.</p>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" className="w-full">Admin Settings</Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}