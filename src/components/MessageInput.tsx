
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from 'lucide-react';
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
      // Get the current user's ID
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
        toast.error('Failed to send message', { description: error.message });
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

  return (
    <form onSubmit={handleSendMessage} className="flex space-x-2">
      <Input 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-grow"
      />
      <Button 
        type="submit" 
        disabled={isSubmitting || !message.trim()}
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default MessageInput;
