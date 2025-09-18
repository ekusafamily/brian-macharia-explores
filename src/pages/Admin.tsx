import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Loader2, ArrowLeft } from 'lucide-react';
import { BlogPost } from '@/types/blog';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { BlogPostForm } from '@/components/admin/BlogPostForm';
import { BlogPostList } from '@/components/admin/BlogPostList';

type AdminView = 'list' | 'create' | 'edit';

const Admin = () => {
  const [currentView, setCurrentView] = useState<AdminView>('list');
  const [editingPost, setEditingPost] = useState<BlogPost | undefined>();
  const { posts, loading, error } = useBlogPosts();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setCurrentView('edit');
  };

  const handleFormSuccess = () => {
    setCurrentView('list');
    setEditingPost(undefined);
    // Trigger a refresh of the posts
    setRefreshKey(prev => prev + 1);
  };

  const handleCancel = () => {
    setCurrentView('list');
    setEditingPost(undefined);
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  // Force re-fetch when refreshKey changes
  useEffect(() => {
    // The useBlogPosts hook will automatically re-fetch
  }, [refreshKey]);

  if (loading) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <span className="text-lg">Loading admin panel...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-destructive">Error loading admin panel</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                {currentView === 'list' && 'Blog Admin'}
                {currentView === 'create' && 'Create New Post'}
                {currentView === 'edit' && 'Edit Post'}
              </h1>
              <p className="text-muted-foreground mt-1">
                {currentView === 'list' && `Manage your ${posts.length} blog posts`}
                {currentView === 'create' && 'Add a new blog post to your site'}
                {currentView === 'edit' && 'Update your blog post'}
              </p>
            </div>
            
            {currentView === 'list' ? (
              <Button onClick={() => setCurrentView('create')}>
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            ) : (
              <Button variant="outline" onClick={handleCancel}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to List
              </Button>
            )}
          </div>
        </div>

        {/* Content */}
        {currentView === 'list' && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Posts</CardDescription>
                  <CardTitle className="text-2xl">{posts.length}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Web Design</CardDescription>
                  <CardTitle className="text-2xl">
                    {posts.filter(p => p.category === 'Web Design').length}
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Technology</CardDescription>
                  <CardTitle className="text-2xl">
                    {posts.filter(p => p.category === 'Technology').length}
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Other</CardDescription>
                  <CardTitle className="text-2xl">
                    {posts.filter(p => !['Web Design', 'Technology'].includes(p.category)).length}
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>

            {/* Posts List */}
            <BlogPostList 
              posts={posts} 
              onEdit={handleEdit} 
              onRefresh={handleRefresh}
            />
          </div>
        )}

        {(currentView === 'create' || currentView === 'edit') && (
          <BlogPostForm
            post={editingPost}
            onSuccess={handleFormSuccess}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default Admin;