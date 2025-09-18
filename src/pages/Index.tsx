import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Code, History, MessageCircle, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import { mockPosts } from "@/data/mockPosts";
import brianPortrait from "@/assets/brian-portrait.jpg";

const Index = () => {
  const latestPosts = mockPosts.slice(0, 3);
  
  const interests = [
    { icon: History, title: "History", description: "Exploring the rich heritage of Kenya and world civilizations" },
    { icon: Calculator, title: "Mathematics", description: "Finding beauty in numbers and logical problem-solving" },
    { icon: Code, title: "Technology", description: "Building digital solutions and exploring new frameworks" },
    { icon: MessageCircle, title: "Communication", description: "Connecting with people and sharing ideas" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 hero-gradient">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
                Hello, I'm
                <span className="block text-accent">Brian Macharia Ireri</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
                A university student from Kenya passionate about history, mathematics, technology, and connecting with people through meaningful conversations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" variant="secondary" className="transition-smooth hover:scale-105">
                  <Link to="/blog">
                    Read My Blog <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-smooth">
                  <Link to="/about">Learn More About Me</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <img 
                  src={brianPortrait}
                  alt="Brian Macharia Ireri"
                  className="w-80 h-80 object-cover rounded-3xl hero-shadow transition-smooth hover:scale-105"
                />
                <div className="absolute -bottom-4 -right-4 w-20 h-20 hero-gradient rounded-2xl flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interests Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-16">
            What I'm <span className="text-gradient">Passionate About</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {interests.map(({ icon: Icon, title, description }) => (
              <Card key={title} className="blog-card text-center group">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 hero-gradient rounded-2xl flex items-center justify-center mb-4 transition-smooth group-hover:scale-110">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-serif">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Latest <span className="text-gradient">Blog Posts</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Thoughts and insights on technology, history, and life experiences
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <Card key={post.id} className="blog-card group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                      {post.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {post.readTime} min read
                    </span>
                  </div>
                  <CardTitle className="text-xl font-serif group-hover:text-primary transition-smooth">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed mb-4">
                    {post.excerpt}
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" className="transition-smooth hover:scale-105">
              <Link to="/blog">
                View All Posts <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;