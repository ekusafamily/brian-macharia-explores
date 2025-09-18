import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Clock, Calendar, Loader2 } from "lucide-react";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { BlogCategory } from "@/types/blog";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | "All">("All");
  const { posts, loading, error } = useBlogPosts();

  const categories: (BlogCategory | "All")[] = ["All", "Web Design", "Technology", "History", "Personal Life"];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryCount = (category: BlogCategory | "All") => {
    if (category === "All") return posts.length;
    return posts.filter(post => post.category === category).length;
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <span className="text-lg">Loading blog posts...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-destructive">Error loading posts</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            My <span className="text-gradient">Blog</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Thoughts, insights, and stories about web design, technology, history, and life experiences. 
            Join me on this journey of continuous learning and discovery.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-base"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="transition-smooth hover:scale-105"
              >
                {category} ({getCategoryCount(category)})
              </Button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-8">
          <p className="text-muted-foreground text-center">
            {filteredPosts.length === 1 
              ? "1 post found" 
              : `${filteredPosts.length} posts found`
            }
          </p>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="blog-card group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <Badge 
                      variant="secondary" 
                      className="bg-primary/10 text-primary hover:bg-primary/20"
                    >
                      {post.category}
                    </Badge>
                     <div className="flex items-center gap-2 text-sm text-muted-foreground">
                       <Clock className="w-4 h-4" />
                       {post.read_time} min
                     </div>
                  </div>
                  <CardTitle className="text-xl font-serif group-hover:text-primary transition-smooth leading-tight">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed mb-4">
                    {post.excerpt}
                  </CardDescription>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.published_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 hero-gradient rounded-3xl flex items-center justify-center">
              <Search className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-serif font-bold mb-4">No posts found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search terms or category filters to find what you're looking for.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Call to Action */}
        {filteredPosts.length > 0 && (
          <div className="mt-16 text-center">
            <Card className="blog-card max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-serif font-bold mb-4">
                  Stay Updated
                </h3>
                <p className="text-muted-foreground mb-6">
                  Enjoyed reading my posts? Connect with me to stay updated on new articles and insights.
                </p>
                <Button asChild size="lg" className="transition-smooth hover:scale-105">
                  <a href="/contact">Get In Touch</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;