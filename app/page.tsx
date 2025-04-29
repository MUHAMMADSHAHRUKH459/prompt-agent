import { PromptGenerator } from '@/components/prompt-generator';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-4 sm:p-8">
      <div className="w-full max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-poppins bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            Roman Urdu to English Prompt Generator
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Transform your Roman Urdu ideas into creative English prompts for AI image generation, story writing, or any creative project.
          </p>
        </div>
        
        <PromptGenerator />
        
        <footer className="text-center text-sm text-muted-foreground mt-12">
          <p>© 2025 Prompt Generator. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}