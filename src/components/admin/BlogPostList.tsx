import { useState } from 'react';
import { BlogPost } from '@/types/blog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Calendar, Clock } from 'lucide-react';
import { useBlogMutations } from '@/hooks/useBlogMutations';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface BlogPostListProps {
  posts: BlogPost[];
  onEdit: (post: BlogPost) => void;
  onRefresh: () => void;
}

export function BlogPostList({ posts, onEdit, onRefresh }: BlogPostListProps) {
  const { deletePost, loading } = useBlogMutations();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const result = await deletePost(id);
    setDeletingId(null);
    
    if (!result.error) {
      onRefresh();
    }
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">No blog posts yet</h3>
        <p className="text-muted-foreground">Create your first blog post to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {posts.map((post) => (
        <Card key={post.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="secondary">{post.category}</Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {post.read_time} min
                  </div>
                </div>
                <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                <CardDescription className="text-base">
                  {post.excerpt}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(post)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={loading && deletingId === post.id}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{post.title}"? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(post.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Published: {new Date(post.published_at).toLocaleDateString()}
              </div>
              <div>
                Slug: /{post.slug}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}