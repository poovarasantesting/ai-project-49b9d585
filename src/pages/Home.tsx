import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowRight, FileUp, Plus } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Diagram Generator
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
            Create beautiful diagrams, flowcharts, and mind maps with our easy-to-use editor.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/editor">
              <Button size="lg" className="gap-2">
                <Plus size={18} />
                Create New Diagram
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="gap-2">
              <FileUp size={18} />
              Import Existing
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Flowcharts",
              description: "Create process flows, algorithms, and decision trees",
              image: "https://images.unsplash.com/photo-1570215170783-82fb6ba3e95a?q=80&w=800&auto=format&fit=crop",
            },
            {
              title: "Mind Maps",
              description: "Visualize ideas, concepts, and brainstorming sessions",
              image: "https://images.unsplash.com/photo-1621600411688-4be93c2c1208?q=80&w=800&auto=format&fit=crop",
            },
            {
              title: "Network Diagrams",
              description: "Map out connections, networks, and system architecture",
              image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop",
            },
          ].map((item, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">{item.description}</p>
                <Link to="/editor" className="text-blue-600 dark:text-blue-400 inline-flex items-center hover:underline">
                  Start Creating <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to create your first diagram?</h2>
          <Link to="/editor">
            <Button size="lg">Get Started</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}