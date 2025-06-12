import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Copy, RefreshCw, Sparkles } from "lucide-react";
import { TaskType, difficultyLevels, generateTask } from "@/lib/task-generator";

export default function TaskGenerator() {
  const { toast } = useToast();
  const [taskType, setTaskType] = useState<TaskType>("syllogism");
  const [difficulty, setDifficulty] = useState(2);
  const [task, setTask] = useState("");
  const [solution, setSolution] = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setShowSolution(false);
    
    // Simulate API call delay
    setTimeout(() => {
      const { task, solution } = generateTask(taskType, difficulty);
      setTask(task);
      setSolution(solution);
      setLoading(false);
    }, 600);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(task + (showSolution ? `\n\nSolution: ${solution}` : ""));
    toast({
      title: "Copied to clipboard",
      description: "The task has been copied to your clipboard.",
    });
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>
      
      <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">
        Logical Tasks Generator
      </h1>
      
      <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Task Type</h3>
            <Select
              value={taskType}
              onValueChange={(value) => setTaskType(value as TaskType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select task type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="syllogism">Syllogism</SelectItem>
                <SelectItem value="sequence">Sequence</SelectItem>
                <SelectItem value="analogy">Analogy</SelectItem>
                <SelectItem value="deduction">Deductive Reasoning</SelectItem>
                <SelectItem value="conditional">Conditional Logic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <h3 className="text-lg font-medium">Difficulty</h3>
              <span className="text-sm text-muted-foreground">
                {difficultyLevels[difficulty - 1]}
              </span>
            </div>
            <Slider
              value={[difficulty]}
              min={1}
              max={5}
              step={1}
              onValueChange={(values) => setDifficulty(values[0])}
            />
          </div>
          
          <Button 
            onClick={handleGenerate} 
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Task
              </>
            )}
          </Button>
        </div>
        
        <div>
          {task ? (
            <Card>
              <CardHeader>
                <CardTitle>
                  {taskType.charAt(0).toUpperCase() + taskType.slice(1)} Task
                </CardTitle>
                <CardDescription>
                  Difficulty: {difficultyLevels[difficulty - 1]}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md bg-muted p-4">
                  <p className="whitespace-pre-wrap">{task}</p>
                </div>
                
                {showSolution && (
                  <div className="rounded-md border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950">
                    <h4 className="mb-2 font-medium text-green-900 dark:text-green-400">Solution:</h4>
                    <p className="text-green-800 dark:text-green-300">{solution}</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setShowSolution(!showSolution)}
                >
                  {showSolution ? "Hide Solution" : "Show Solution"}
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={copyToClipboard}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="flex h-full min-h-[300px] items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-medium">No task generated yet</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Select a task type and difficulty level, then click the generate button to create a logical reasoning task.
                </p>
                <Button size="sm" onClick={handleGenerate}>
                  Generate First Task
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}