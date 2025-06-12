import { ThemeProvider } from "./components/ThemeProvider";
import { ThemeToggle } from "./components/ThemeToggle";

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <div className="min-h-screen bg-background text-foreground transition-colors">
        <header className="border-b p-4 flex justify-end">
          <ThemeToggle />
        </header>
        <main className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6">Theme Toggle Example</h1>
          <p className="mb-4">
            This application supports light and dark modes. Toggle the theme using the 
            sun/moon button in the header.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4 shadow-sm">
              <h2 className="text-xl font-semibold mb-2">Light Mode</h2>
              <p>Light mode uses bright colors and is great for daytime use.</p>
            </div>
            <div className="rounded-lg border p-4 shadow-sm">
              <h2 className="text-xl font-semibold mb-2">Dark Mode</h2>
              <p>Dark mode uses darker colors and is easier on the eyes at night.</p>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;