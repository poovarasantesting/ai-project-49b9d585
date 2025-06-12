import React from 'react';
import { Link } from 'react-router-dom';
import { Share2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HomePage() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-6 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <Share2 className="h-16 w-16 rotate-45 text-blue-600" />
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Create Beautiful Flow Charts
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          A simple yet powerful flow chart creator to visualize processes, algorithms, and workflows with ease.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Link to="/editor">
            <Button className="text-lg h-12 px-8">
              Start Creating
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Share2 className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Intuitive Interface</h3>
            <p className="text-gray-600">
              Drag and drop nodes, connect them with edges, and customize your flowchart with ease.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Share2 className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Multiple Node Types</h3>
            <p className="text-gray-600">
              Choose from process, decision, start/end, and input/output node types to represent your workflow.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Share2 className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Export & Share</h3>
            <p className="text-gray-600">
              Export your diagrams as PNG images to use in presentations, documents, or share with others.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}