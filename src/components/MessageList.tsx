
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
  username?: string;
}

const MessageList: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data: messagesData, error: messagesError } = await supabase
          .from('messages')
          .select('*')
          .order('created_at', { ascending: true });

        if (messagesError) throw messagesError;
        
        const messagesWithUsernames = await Promise.all((messagesData || []).map(async (message) => {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', message.user_id)
            .single();
            
          return {
            ...message,
            username: profileData?.username || "Anonymous Member" 
          };
        }));
        
        setMessages(messagesWithUsernames);
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
        { event: '*', schema: 'public', table: 'messages' },
        async (payload) => {
          if (payload.eventType === 'DELETE') {
            setMessages(prev => prev.filter(msg => msg.user_id !== payload.old.user_id));
            return;
          }
          
          if (payload.eventType === 'INSERT') {
            const { data: profileData } = await supabase
              .from('profiles')
              .select('username')
              .eq('id', payload.new.user_id)
              .single();
              
            const newMessage = {
              ...payload.new as Message,
              username: profileData?.username || "Anonymous Member"
            };
            
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return <div className="text-center py-4 text-muted-foreground">Loading messages...</div>;
  }

  return (
    <div className="space-y-4 max-h-[400px] overflow-y-auto p-4 scrollbar-none">
      {messages.map((message) => (
        <div 
          key={message.id} 
          className="bg-card/50 p-4 rounded-lg transition-all duration-300 hover:bg-card/70 group"
        >
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-accent/80" />
            <span className="font-medium text-accent hover:text-accent/80 transition-colors duration-300">
              {message.username}
            </span>
          </div>
          <p className="text-foreground/90">{message.content}</p>
          <div className="text-xs text-muted-foreground mt-2 opacity-60 group-hover:opacity-100 transition-all duration-300">
            {format(new Date(message.created_at), 'HH:mm, dd MMM yyyy')}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
