import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot } from "lucide-react";
import { toast } from "sonner";

const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!query.trim()) {
      toast.error("Please enter a question");
      return;
    }
    
    setIsLoading(true);
    try {
      const res = await fetch("https://generativelanguage.googleapis.com/v1/models/gemini-1.0-pro:generateContent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": "AIzaSyDUWqtcLCBoAVNrPUDFxv9phaVXp4BQDvg"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: query
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          }
        })
      });
      
      const data = await res.json();
      
      if (data.candidates && data.candidates[0].content) {
        setResponse(data.candidates[0].content.parts[0].text);
      } else if (data.promptFeedback && data.promptFeedback.blockReason) {
        setResponse(`Sorry, your request was blocked: ${data.promptFeedback.blockReason}`);
        toast.error("Request blocked by AI safety filters");
      } else {
        console.error("Unexpected API response:", data);
        setResponse("Sorry, I couldn't process your request. Please try again.");
      }
    } catch (error) {
      console.error("Error contacting Gemini API:", error);
      setResponse("Sorry, an error occurred. Please try again later.");
      toast.error("Failed to get response from AI");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-card border border-border rounded-lg shadow-lg w-80 overflow-hidden transition-all duration-300 flex flex-col">
          <div className="flex justify-between items-center p-3 bg-primary/10">
            <div className="flex items-center gap-2">
              <Bot size={16} className="text-accent" />
              <span className="text-sm font-medium">AI Assistant</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </Button>
          </div>
          
          <div className="p-3 max-h-60 overflow-y-auto bg-background/80">
            {response && (
              <div className="message-bubble mb-3 text-sm">
                <p>{response}</p>
              </div>
            )}
          </div>
          
          <div className="p-3 border-t border-border">
            <Textarea 
              placeholder="Ask a question..." 
              className="min-h-[60px] text-sm mb-2"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
            <Button 
              size="sm" 
              className="w-full" 
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Ask"}
            </Button>
          </div>
        </div>
      ) : (
        <Button 
          variant="secondary"
          size="icon"
          className="rounded-full h-10 w-10 shadow-lg hover:shadow-accent/20"
          onClick={() => setIsOpen(true)}
        >
          <Bot className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default AiAssistant;
