export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  published_at: string;
  read_time: number;
  slug: string;
  created_at: string;
  updated_at: string;
}

// Utility type for legacy component compatibility
export interface BlogPostLegacy extends BlogPost {
  publishedAt: string;
  readTime: number;
}

export type BlogCategory = "Web Design" | "Technology" | "History" | "Personal Life";

export interface BlogCategories {
  "Web Design": BlogPost[];
  "Technology": BlogPost[];
  "History": BlogPost[];
  "Personal Life": BlogPost[];
}