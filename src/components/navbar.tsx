import React from 'react';
import { Link } from 'react-router-dom';
import { Share2, Home } from 'lucide-react';
import { Button } from './ui/button';

export function Navbar() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <Link to="/" className="font-bold text-xl flex items-center gap-2">
          <Share2 className="h-6 w-6 rotate-45" />
          <span>FlowChart Generator</span>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}