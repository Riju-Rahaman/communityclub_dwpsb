
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
  username?: string; // Changed from nested profiles object
}

const MessageList: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // First fetch messages
        const { data: messagesData, error: messagesError } = await supabase
          .from('messages')
          .select('*')
          .order('created_at', { ascending: true });

        if (messagesError) throw messagesError;
        
        // Then fetch profiles separately and join them in memory
        const messagesWithUsernames = await Promise.all((messagesData || []).map(async (message) => {
          // Get the profile for this message's user_id
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
        { event: 'INSERT', schema: 'public', table: 'messages' },
        async (payload) => {
          // When a new message is received, get its username
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
    <div className="space-y-4 max-h-[400px] overflow-y-auto p-4 transition-all duration-300">
      {messages.map((message) => (
        <div 
          key={message.id} 
          className="bg-card p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-101 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-50 rounded-lg"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-primary/80" />
              <span className="font-medium text-primary/90 hover:text-primary transition-colors duration-300">
                {message.username || "Anonymous Member"}
              </span>
            </div>
            <p className="text-foreground/90 transition-all duration-300">{message.content}</p>
            <div className="text-xs text-muted-foreground mt-2 transition-all duration-300">
              {format(new Date(message.created_at), 'HH:mm, dd MMM yyyy')}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
