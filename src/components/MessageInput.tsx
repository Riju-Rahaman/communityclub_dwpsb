
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Eraser } from 'lucide-react';
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
    <div className="space-y-2">
      <form onSubmit={handleSendMessage} className="flex space-x-2">
        <Input 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow bg-card"
        />
        <Button 
          type="submit" 
          disabled={isSubmitting || !message.trim()}
          variant="secondary"
          className="bg-accent hover:bg-accent/80 text-accent-foreground"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
      <Button
        onClick={handleClearMessages}
        variant="outline"
        className="w-full text-sm text-muted-foreground hover:text-destructive"
      >
        <Eraser className="h-4 w-4 mr-2" />
        Clear My Messages
      </Button>
    </div>
  );
};

export default MessageInput;
