
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
    return (
      <div className="text-center py-8 text-muted-foreground animate-pulse">
        <div className="inline-block rounded-full h-6 w-6 bg-muted-foreground/20 animate-spin-slow mr-2"></div>
        Loading messages...
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-[400px] overflow-y-auto p-4 scrollbar-none">
      {messages.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No messages yet. Be the first to send one!
        </div>
      ) : (
        messages.map((message) => (
          <div 
            key={message.id} 
            className="message-bubble transition-all duration-300 hover-scale group"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-secondary/20 rounded-full p-1">
                <User className="w-3.5 h-3.5 text-secondary" />
              </div>
              <span className="font-medium text-accent hover:text-accent/80 transition-colors duration-300">
                {message.username}
              </span>
            </div>
            <p className="text-foreground/90 font-light tracking-wide">{message.content}</p>
            <div className="timestamp text-right mt-2">
              {format(new Date(message.created_at), 'HH:mm, dd MMM yyyy')}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MessageList;
