export interface Blog {
    id: string;
  
    title: string;
  
    slug: string;
  
    excerpt: string;
  
    content: string;
  
    coverImage: string;
  
    author: string;
  
    tags: string[];
  
    readTime: number;
  
    metaTitle?: string;
  
    metaDescription?: string;
  
    isPublished: boolean;
  
    publishedAt: string;
  
    createdAt: string;
  
    updatedAt: string;
  }