// app/components/PromptGenerator.tsx

'use client';

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function PromptGenerator() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!inputText.trim()) return;
  
    setIsGenerating(true);
  
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: inputText }),
      });
  
      const data = await response.json();
      setOutputText(data.result);
    } catch (error) {
      console.error("Error generating prompt:", error);
      setOutputText("Something went wrong. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };
  

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <Card className="border-none shadow-md bg-card/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl font-semibold text-center">
            Enter your idea in Roman Urdu
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            We will transform it into a creative English prompt
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Textarea 
              placeholder="Type your Roman Urdu text here..." 
              className="h-32 resize-none focus:ring-primary/30 text-base"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: outputText ? 1 : 0, y: outputText ? 0 : 10 }}
            transition={{ duration: 0.3 }}
            className="space-y-2"
          >
            {outputText && (
              <>
                <div className="text-sm font-medium text-muted-foreground">
                  Generated Prompt:
                </div>
                <Card className="bg-primary/5 p-4 rounded-md border-none">
                  <p className="text-base">{outputText}</p>
                </Card>
              </>
            )}
          </motion.div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleGenerate} 
            disabled={!inputText.trim() || isGenerating}
            className="w-full py-6 text-base font-medium transition-all"
            size="lg"
          >
            {isGenerating ? (
              <span className="flex items-center">
                <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                Generating...
              </span>
            ) : (
              <span className="flex items-center">
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Prompt
              </span>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
