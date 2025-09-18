import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Send, MapPin, Phone, Globe } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
    }, 1000);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      description: "Drop me a line anytime",
      value: "brian.ireri@example.com",
      action: "mailto:brian.ireri@example.com"
    },
    {
      icon: MapPin,
      title: "Location",
      description: "Based in Kenya",
      value: "Nairobi, Kenya",
      action: null
    },
    {
      icon: Globe,
      title: "Website",
      description: "Explore my work",
      value: "brianireri.com",
      action: "https://brianireri.com"
    }
  ];

  const socialLinks = [
    { name: "LinkedIn", url: "#", icon: "👔" },
    { name: "Twitter", url: "#", icon: "🐦" },
    { name: "GitHub", url: "#", icon: "💻" },
    { name: "Instagram", url: "#", icon: "📸" }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Let's <span className="text-gradient">Connect</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I'm always excited to connect with fellow students, developers, history enthusiasts, 
            or anyone who enjoys meaningful conversations. Reach out and let's start a dialogue!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="blog-card">
            <CardHeader>
              <CardTitle className="text-2xl font-serif flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-primary" />
                Send Me a Message
              </CardTitle>
              <CardDescription>
                Fill out the form below and I'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      placeholder="Your first name" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      placeholder="Your last name" 
                      required 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your.email@example.com" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input 
                    id="subject" 
                    placeholder="What's this about?" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell me about your project, question, or just say hello!" 
                    className="min-h-[120px]" 
                    required 
                  />
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full transition-smooth hover:scale-105"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Methods */}
            <Card className="blog-card">
              <CardHeader>
                <CardTitle className="text-2xl font-serif">Get In Touch</CardTitle>
                <CardDescription>
                  Here are the best ways to reach me
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactMethods.map(({ icon: Icon, title, description, value, action }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="w-12 h-12 hero-gradient rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{title}</h3>
                      <p className="text-muted-foreground text-sm mb-1">{description}</p>
                      {action ? (
                        <a 
                          href={action} 
                          className="text-primary hover:underline font-medium"
                          target={action.startsWith('http') ? '_blank' : undefined}
                          rel={action.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {value}
                        </a>
                      ) : (
                        <span className="font-medium">{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="blog-card">
              <CardHeader>
                <CardTitle className="text-2xl font-serif">Follow Me</CardTitle>
                <CardDescription>
                  Connect with me on social media
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map(({ name, url, icon }) => (
                    <Button 
                      key={name}
                      variant="outline" 
                      asChild 
                      className="h-16 transition-smooth hover:scale-105"
                    >
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        <span className="text-2xl mr-2">{icon}</span>
                        {name}
                      </a>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card className="blog-card">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-serif font-bold mb-4">
                  Let's Build Something Together
                </h3>
                <p className="text-muted-foreground mb-6">
                  Whether you're looking for web design services, want to discuss historical topics, 
                  or just want to have an interesting conversation, I'm here for it!
                </p>
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    Quick Response
                  </span>
                  <span className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    Open to Collaborations
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;