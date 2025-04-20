
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { format } from 'date-fns';
import { toast } from "sonner";
import { User } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles?: {
    username?: string;
  };
}

const MessageList: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('messages')
          .select(`
            *,
            profiles:user_id (
              username
            )
          `)
          .order('created_at', { ascending: true });

        if (error) throw error;
        setMessages(data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching messages:', error);
        toast.error('Failed to load messages');
        setLoading(false);
      }
    };

    fetchMessages();

    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          setMessages((prevMessages) => [...prevMessages, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading messages...</div>;
  }

  return (
    <div className="space-y-4 max-h-[400px] overflow-y-auto p-4">
      {messages.map((message) => (
        <div 
          key={message.id} 
          className="bg-card p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-primary/60" />
            <span className="font-medium text-primary">
              {message.profiles?.username || "Anonymous Member"}
            </span>
          </div>
          <p className="text-foreground/90">{message.content}</p>
          <div className="text-xs text-muted-foreground mt-2">
            {format(new Date(message.created_at), 'HH:mm, dd MMM yyyy')}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
