
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Upload, Image as ImageIcon } from "lucide-react";

// Define the image table structure to match what we created in the database
interface ImageInsert {
  url: string;
  title: string;
  uploaded_by: string;
}

const AdminImageUpload: React.FC = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('You must be logged in to upload images');
        return;
      }

      const { error: profileError, data: profileData } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;
      
      if (profileData.role !== 'admin') {
        toast.error('Only admins can upload images');
        return;
      }

      // Use direct SQL query via the rpc function to avoid type issues
      const { error } = await supabase
        .rpc('insert_image', {
          image_url: imageUrl,
          image_title: title,
          uploader_id: user.id
        });

      if (error) throw error;

      toast.success('Image uploaded successfully');
      setImageUrl('');
      setTitle('');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-background/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-4 flex items-center text-foreground dark:text-white">
        <ImageIcon className="mr-2" /> Admin Image Upload
      </h2>
      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <label htmlFor="imageUrl" className="block mb-2 text-foreground dark:text-gray-200">Image URL</label>
          <Input 
            id="imageUrl"
            type="text" 
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
            required
            className="bg-background/30 dark:bg-gray-700/50"
          />
        </div>
        <div>
          <label htmlFor="title" className="block mb-2 text-foreground dark:text-gray-200">Image Title</label>
          <Input 
            id="title"
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter image title"
            className="bg-background/30 dark:bg-gray-700/50"
          />
        </div>
        <Button type="submit" className="w-full bg-primary/80 hover:bg-primary dark:bg-blue-600/80 dark:hover:bg-blue-500 backdrop-blur-sm">
          <Upload className="mr-2" /> Upload Image
        </Button>
      </form>
    </div>
  );
};

export default AdminImageUpload;
