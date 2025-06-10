
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Array<{query: string, response: string}>>([]);
  const [showHistory, setShowHistory] = useState(true);

  const handleSubmit = async () => {
    if (!query.trim()) {
      toast.error("Please enter a question");
      return;
    }
    
    setIsLoading(true);
    setShowHistory(false); // Hide history while getting response
    
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
        const responseText = data.candidates[0].content.parts[0].text;
        setResponse(responseText);
        // Add to conversation history
        setConversationHistory(prev => [...prev, {query: query, response: responseText}]);
        setQuery(""); // Clear the input
      } else if (data.promptFeedback && data.promptFeedback.blockReason) {
        const errorMsg = `Sorry, your request was blocked: ${data.promptFeedback.blockReason}`;
        setResponse(errorMsg);
        toast.error("Request blocked by AI safety filters");
      } else {
        console.error("Unexpected API response:", data);
        setResponse("Sorry, I couldn't process your request. Please try again.");
        toast.error("Failed to get response from AI");
      }
    } catch (error) {
      console.error("Error contacting Gemini API:", error);
      setResponse("Sorry, an error occurred. Please try again later.");
      toast.error("Failed to get response from AI");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setResponse("");
    setShowHistory(true);
  };

  const resetChat = () => {
    setResponse("");
    setQuery("");
    setShowHistory(true);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-card border border-border rounded-lg shadow-lg w-80 overflow-hidden transition-all duration-300 flex flex-col max-h-96">
          <div className="flex justify-between items-center p-3 bg-primary/10 border-b border-border">
            <div className="flex items-center gap-2">
              {response && !showHistory ? (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0"
                  onClick={handleBack}
                >
                  <ArrowLeft size={16} className="text-accent" />
                </Button>
              ) : (
                <Bot size={16} className="text-accent" />
              )}
              <span className="text-sm font-medium">AI Assistant</span>
            </div>
            <div className="flex items-center gap-1">
              {conversationHistory.length > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 text-xs px-2"
                  onClick={resetChat}
                >
                  New Chat
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </Button>
            </div>
          </div>
          
          <div className="p-3 flex-1 overflow-y-auto bg-background/80 min-h-[200px]">
            {showHistory ? (
              <>
                {conversationHistory.length > 0 ? (
                  <div className="space-y-3">
                    {conversationHistory.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="bg-primary/5 p-2 rounded-md">
                          <p className="text-sm font-medium text-primary">You:</p>
                          <p className="text-sm">{item.query}</p>
                        </div>
                        <div className="bg-accent/5 p-2 rounded-md">
                          <p className="text-sm font-medium text-accent">Assistant:</p>
                          <p className="text-sm">{item.response}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground text-center my-8">
                    <Bot className="h-8 w-8 mx-auto mb-2 text-accent/50" />
                    Ask me anything to get started!
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-3">
                {isLoading ? (
                  <div className="text-sm text-muted-foreground text-center my-8">
                    <div className="animate-pulse">Thinking...</div>
                  </div>
                ) : (
                  response && (
                    <div className="bg-accent/5 p-3 rounded-md">
                      <p className="text-sm font-medium text-accent mb-2">Assistant:</p>
                      <p className="text-sm whitespace-pre-wrap">{response}</p>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
          
          <div className="p-3 border-t border-border bg-card">
            <Textarea 
              placeholder="Ask a question..." 
              className="min-h-[60px] text-sm mb-2 resize-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              disabled={isLoading}
            />
            <Button 
              size="sm" 
              className="w-full" 
              onClick={handleSubmit}
              disabled={isLoading || !query.trim()}
            >
              {isLoading ? "Processing..." : "Ask"}
            </Button>
          </div>
        </div>
      ) : (
        <Button 
          variant="secondary"
          size="icon"
          className="rounded-full h-12 w-12 shadow-lg hover:shadow-accent/20 transition-all duration-300"
          onClick={() => setIsOpen(true)}
        >
          <Bot className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default AiAssistant;
