import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-16">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-8 rounded-full bg-primary/10 p-4">
          <Brain size={48} className="text-primary" />
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Logical Tasks Generator
        </h1>
        <p className="mb-8 max-w-[42rem] text-lg text-muted-foreground">
          Generate logical reasoning tasks, puzzles, and challenges to improve critical thinking skills.
        </p>
        <Link to="/task-generator">
          <Button size="lg">
            Start Generating Tasks
          </Button>
        </Link>
      </div>
    </div>
  );
}