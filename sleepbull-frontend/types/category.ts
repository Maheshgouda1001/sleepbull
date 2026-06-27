export interface Category {
    id: string;
  
    name: string;
  
    slug: string;
  
    description?: string;
  
    image?: string;
  
    banner?: string;
  
    metaTitle?: string;
  
    metaDescription?: string;
  
    isFeatured: boolean;
  
    isActive: boolean;
  
    sortOrder: number;
  
    createdAt: string;
  
    updatedAt: string;
  }