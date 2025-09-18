-- Create blog posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Web Design', 'Technology', 'History', 'Personal Life')),
  slug TEXT NOT NULL UNIQUE,
  read_time INTEGER NOT NULL DEFAULT 5,
  published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to read blog posts (public blog)
CREATE POLICY "Anyone can view published blog posts" 
ON public.blog_posts 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some initial blog posts
INSERT INTO public.blog_posts (title, excerpt, content, category, slug, read_time) VALUES
(
  'The Evolution of Web Design: From Static to Dynamic', 
  'Exploring how web design has transformed over the past decade, from simple static pages to interactive, responsive experiences.',
  'Web design has come a long way since the early days of the internet. In this post, I explore the major shifts in design philosophy, the rise of mobile-first design, and the tools that have revolutionized how we build websites today.',
  'Web Design',
  'evolution-of-web-design',
  8
),
(
  'Understanding Kenyan Colonial History Through Digital Archives',
  'How technology is helping preserve and share Kenya''s rich historical narrative with new generations.',
  'Digital archives are revolutionizing how we access and understand historical documents. This post examines several key digital projects that are making Kenyan colonial history more accessible to researchers and the general public.',
  'History', 
  'kenyan-colonial-history-digital-archives',
  12
),
(
  'Building Responsive Layouts with CSS Grid and Flexbox',
  'A practical guide to modern CSS layout techniques that every web designer should master.',
  'CSS Grid and Flexbox have transformed how we approach web layouts. In this comprehensive guide, I break down when to use each technique and provide practical examples for common layout challenges.',
  'Web Design',
  'responsive-layouts-css-grid-flexbox',
  10
),
(
  'The Mathematics Behind Algorithm Efficiency',
  'Exploring how mathematical concepts like Big O notation help us write better, faster code.',
  'As a mathematics student, I''m fascinated by how mathematical principles apply to programming. This post explores algorithm analysis, time complexity, and why understanding these concepts is crucial for any developer.',
  'Technology',
  'mathematics-algorithm-efficiency', 
  15
),
(
  'Reflections on University Life in Kenya',
  'Personal thoughts on the challenges and opportunities of being a student in Kenya''s education system.',
  'University life in Kenya comes with unique challenges and incredible opportunities. In this personal reflection, I share my experiences, the lessons I''ve learned, and advice for fellow students navigating similar paths.',
  'Personal Life',
  'reflections-university-life-kenya',
  7
),
(
  'The Rise of Mobile-First Design in East Africa',
  'Why mobile-first design isn''t just a trend—it''s a necessity in the East African market.',
  'With mobile internet usage dominating in East Africa, designing for mobile-first isn''t optional—it''s essential. This post examines the unique considerations for designing digital experiences for African users.',
  'Technology',
  'mobile-first-design-east-africa',
  9
);