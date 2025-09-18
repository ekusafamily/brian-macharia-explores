import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BlogPost, BlogCategory } from '@/types/blog';
import { useToast } from '@/hooks/use-toast';

export function useBlogMutations() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const createPost = async (postData: {
    title: string;
    excerpt: string;
    content: string;
    category: BlogCategory;
    slug: string;
    read_time: number;
  }) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([postData])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post created successfully!",
      });

      return { data, error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create post';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return { data: null, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async (id: string, postData: Partial<BlogPost>) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .update(postData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post updated successfully!",
      });

      return { data, error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update post';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return { data: null, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: string) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post deleted successfully!",
      });

      return { error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete post';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return { error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    createPost,
    updatePost,
    deletePost,
    loading,
  };
}