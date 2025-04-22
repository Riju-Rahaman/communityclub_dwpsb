
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Trash2 } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface MessageInputProps {
  onMessageSent?: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onMessageSent }) => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;

    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('You must be logged in to send messages');
        return;
      }

      const { error } = await supabase
        .from('messages')
        .insert({ 
          content: message,
          user_id: user.id 
        });

      if (error) {
        toast.error('Failed to send message');
      } else {
        setMessage('');
        onMessageSent?.();
        toast.success('Message sent');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearMessages = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('You must be logged in to clear messages');
        return;
      }

      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('user_id', user.id);

      if (error) {
        toast.error('Failed to clear messages');
      } else {
        toast.success('Messages cleared');
        onMessageSent?.();
      }
    } catch (error) {
      console.error('Error clearing messages:', error);
      toast.error('An unexpected error occurred');
    }
  };

  return (
    <div className="space-y-3">
      <form onSubmit={handleSendMessage} className="flex space-x-2">
        <Input 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow bg-input backdrop-blur-sm border-white/10 rounded-xl focus:border-accent/50 focus:ring-accent/30 text-foreground"
        />
        <Button 
          type="submit" 
          disabled={isSubmitting || !message.trim()}
          variant="secondary"
          className="bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-xl transition-all duration-300 hover:shadow-lg"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
      <Button
        onClick={handleClearMessages}
        variant="outline"
        className="w-full text-sm text-muted-foreground hover:text-destructive border border-white/10 bg-transparent hover:bg-destructive/10 rounded-xl transition-all duration-300"
      >
        <Trash2 className="h-4 w-4 mr-2" />
        Clear My Messages
      </Button>
    </div>
  );
};

export default MessageInput;
