export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  publishedAt: string;
  readTime: number;
  slug: string;
}

export type BlogCategory = "Web Design" | "Technology" | "History" | "Personal Life";

export interface BlogCategories {
  "Web Design": BlogPost[];
  "Technology": BlogPost[];
  "History": BlogPost[];
  "Personal Life": BlogPost[];
}