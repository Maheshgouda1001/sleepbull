export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface NewsletterPayload {
  email: string;
}

export interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
  createdAt: string;
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  isActive: boolean;
  createdAt: string;
}
