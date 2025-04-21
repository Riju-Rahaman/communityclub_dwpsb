
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Upload, Image as ImageIcon } from "lucide-react";

const AdminImageUpload: React.FC = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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

      // Use direct insert into 'images' table instead of .rpc
      const { error } = await supabase
        .from('images')
        .insert({
          url: imageUrl,
          title: title,
          uploaded_by: user.id,
        });

      if (error) throw error;

      toast.success('Image uploaded successfully');
      setImageUrl('');
      setTitle('');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        max-w-md mx-auto my-8 p-8 rounded-2xl glass-morphism bg-gradient-to-br from-white/10 via-background/70 to-black/80
        dark:bg-gradient-to-br dark:from-white/5 dark:via-background/40 dark:to-black/70
        border border-gray-300/10 backdrop-blur-2xl shadow-[0_4px_32px_-6px_rgba(0,0,0,0.65)] transition-all
      "
      style={{ boxShadow: "0 2px 40px 0 rgba(0,0,0,0.45), 0 1.5px 7px 0 rgba(80,80,120,0.08)" }}
    >
      <h2 className="text-2xl font-bold mb-5 flex items-center justify-center text-white/90 dark:text-white text-gradient-primary drop-shadow-xl tracking-tight">
        <ImageIcon className="mr-2 drop-shadow-lg text-blue-300" />
        Admin Image Upload
      </h2>
      <form onSubmit={handleUpload} className="space-y-6">
        <div>
          <label htmlFor="imageUrl" className="block mb-2 text-white/80 dark:text-blue-100 font-semibold">
            Image URL
          </label>
          <Input
            id="imageUrl"
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
            required
            disabled={loading}
            className="bg-white/20 dark:bg-gray-800/70 text-white placeholder:text-blue-200/60 border-blue-200/30 dark:border-blue-400/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
        <div>
          <label htmlFor="title" className="block mb-2 text-white/80 dark:text-blue-100 font-semibold">
            Image Title
          </label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter image title"
            disabled={loading}
            className="bg-white/20 dark:bg-gray-800/70 text-white placeholder:text-blue-200/60 border-blue-200/30 dark:border-blue-400/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="
            w-full bg-gradient-to-r from-blue-700/80 to-violet-800/70 hover:from-blue-600 hover:to-violet-700 transition
            text-lg font-semibold rounded-xl shadow-md py-3 flex items-center justify-center gap-2
          "
        >
          {loading ? (
            "Uploading..."
          ) : (
            <>
              <Upload className="mr-2" />
              Upload Image
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default AdminImageUpload;
