import { Button } from "../ui/button";
import { 
  AlignCenter, 
  AlignLeft, 
  AlignRight, 
  Bold, 
  Italic, 
  Redo, 
  Undo, 
  ZoomIn, 
  ZoomOut
} from "lucide-react";
import { Separator } from "../ui/separator";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function DiagramToolbar() {
  return (
    <div className="bg-white dark:bg-slate-800 p-2 border-b dark:border-slate-700 flex items-center gap-2 overflow-x-auto">
      <Button variant="ghost" size="icon" title="Undo">
        <Undo size={18} />
      </Button>
      <Button variant="ghost" size="icon" title="Redo">
        <Redo size={18} />
      </Button>
      
      <Separator orientation="vertical" className="h-6" />
      
      <Button variant="ghost" size="icon" title="Zoom In">
        <ZoomIn size={18} />
      </Button>
      <Button variant="ghost" size="icon" title="Zoom Out">
        <ZoomOut size={18} />
      </Button>
      
      <Separator orientation="vertical" className="h-6" />
      
      <Select defaultValue="arial">
        <SelectTrigger className="w-[120px] h-8">
          <SelectValue placeholder="Font" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="arial">Arial</SelectItem>
          <SelectItem value="helvetica">Helvetica</SelectItem>
          <SelectItem value="times">Times New Roman</SelectItem>
          <SelectItem value="courier">Courier</SelectItem>
        </SelectContent>
      </Select>
      
      <Select defaultValue="12">
        <SelectTrigger className="w-[70px] h-8">
          <SelectValue placeholder="Size" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="12">12</SelectItem>
          <SelectItem value="14">14</SelectItem>
          <SelectItem value="16">16</SelectItem>
          <SelectItem value="18">18</SelectItem>
        </SelectContent>
      </Select>
      
      <Button variant="ghost" size="icon" title="Bold">
        <Bold size={18} />
      </Button>
      <Button variant="ghost" size="icon" title="Italic">
        <Italic size={18} />
      </Button>
      
      <Separator orientation="vertical" className="h-6" />
      
      <Button variant="ghost" size="icon" title="Align Left">
        <AlignLeft size={18} />
      </Button>
      <Button variant="ghost" size="icon" title="Align Center">
        <AlignCenter size={18} />
      </Button>
      <Button variant="ghost" size="icon" title="Align Right">
        <AlignRight size={18} />
      </Button>
      
      <Separator orientation="vertical" className="h-6" />
      
      <Select defaultValue="flowchart">
        <SelectTrigger className="w-[150px] h-8">
          <SelectValue placeholder="Diagram Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="flowchart">Flowchart</SelectItem>
          <SelectItem value="mindmap">Mind Map</SelectItem>
          <SelectItem value="orgchart">Org Chart</SelectItem>
          <SelectItem value="network">Network Diagram</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}