import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { DiagramIcon } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-slate-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <DiagramIcon size={24} />
            <span>Diagram Generator</span>
          </Link>
        </div>
      </header>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="bg-slate-100 p-4 text-center text-sm text-gray-600">
        <div className="container mx-auto">
          <p>Diagram Generator Tool &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}