import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Node, Edge } from 'reactflow';

export interface Diagram {
  id: string;
  name: string;
  nodes: Node[];
  edges: Edge[];
  lastEdited: number;
}

interface DiagramStore {
  diagrams: Diagram[];
  getDiagram: (id: string) => Diagram | undefined;
  saveDiagram: (diagram: Diagram) => void;
  removeDiagram: (id: string) => void;
}

export const useDiagramStore = create<DiagramStore>()(
  persist(
    (set, get) => ({
      diagrams: [],
      
      getDiagram: (id: string) => {
        return get().diagrams.find(diagram => diagram.id === id);
      },
      
      saveDiagram: (diagram: Diagram) => {
        const { diagrams } = get();
        const existingIndex = diagrams.findIndex(d => d.id === diagram.id);
        
        if (existingIndex >= 0) {
          // Update existing diagram
          const updatedDiagrams = [...diagrams];
          updatedDiagrams[existingIndex] = diagram;
          set({ diagrams: updatedDiagrams });
        } else {
          // Add new diagram
          set({ diagrams: [...diagrams, diagram] });
        }
      },
      
      removeDiagram: (id: string) => {
        set(state => ({
          diagrams: state.diagrams.filter(diagram => diagram.id !== id)
        }));
      }
    }),
    {
      name: 'diagram-storage',
    }
  )
);