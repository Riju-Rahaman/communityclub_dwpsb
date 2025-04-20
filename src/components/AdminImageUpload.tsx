
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Upload, Image as ImageIcon } from "lucide-react";

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

      const { error } = await supabase
        .from('images')
        .insert({
          url: imageUrl,
          title: title,
          uploaded_by: user.id
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
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <ImageIcon className="mr-2" /> Admin Image Upload
      </h2>
      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <label htmlFor="imageUrl" className="block mb-2">Image URL</label>
          <Input 
            id="imageUrl"
            type="text" 
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
            required
          />
        </div>
        <div>
          <label htmlFor="title" className="block mb-2">Image Title</label>
          <Input 
            id="title"
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter image title"
          />
        </div>
        <Button type="submit" className="w-full">
          <Upload className="mr-2" /> Upload Image
        </Button>
      </form>
    </div>
  );
};

export default AdminImageUpload;
