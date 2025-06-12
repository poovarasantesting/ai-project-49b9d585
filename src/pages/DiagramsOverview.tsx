import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PlusCircle, FileEdit, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { useDiagramStore } from "../store/diagramStore";
import { useToast } from "../components/ui/use-toast";
import { Layout } from "../components/Layout";
import { v4 as uuidv4 } from 'uuid';

export default function DiagramsOverview() {
  const { diagrams, removeDiagram } = useDiagramStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const createNewDiagram = () => {
    const id = uuidv4();
    navigate(`/editor/${id}`);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    removeDiagram(id);
    toast({
      title: "Diagram deleted",
      description: "Your diagram has been successfully deleted."
    });
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Your Diagrams</h1>
          <Button onClick={createNewDiagram} className="flex items-center gap-2">
            <PlusCircle size={18} /> Create New Diagram
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {diagrams.length > 0 ? (
            diagrams.map((diagram) => (
              <Link key={diagram.id} to={`/editor/${diagram.id}`} className="group">
                <Card className="h-full transition-all hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>{diagram.name || "Untitled Diagram"}</span>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" asChild>
                          <FileEdit size={18} className="text-gray-500" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={(e) => handleDelete(diagram.id, e)}
                          className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-32 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                      {diagram.nodes.length > 0 ? (
                        <div className="text-xs">
                          {diagram.nodes.length} nodes, {diagram.edges.length} connections
                        </div>
                      ) : (
                        <div className="text-xs">Empty diagram</div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="text-sm text-gray-500">
                    Last edited: {new Date(diagram.lastEdited).toLocaleDateString()}
                  </CardFooter>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <h3 className="text-xl font-medium text-gray-600 mb-4">No diagrams yet</h3>
              <p className="text-gray-500 mb-6">Create your first diagram to get started</p>
              <Button onClick={createNewDiagram} className="flex items-center gap-2">
                <PlusCircle size={18} /> Create New Diagram
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}