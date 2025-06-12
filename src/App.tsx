import { Calculator } from "./components/Calculator";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Calculator />
      </div>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;