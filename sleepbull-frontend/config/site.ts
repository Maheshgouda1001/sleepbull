export const siteConfig = {
    // ==========================================
    // Website Information
    // ==========================================
    name: "SleepBull",
    shortName: "SleepBull",
    companyName: "SleepBull",
    tagline: "Sleep Better. Live Better.",
  
    description:
      "Discover premium mattresses, pillows, bed frames, and sleep accessories crafted for exceptional comfort and orthopedic support. Experience luxurious sleep with SleepBull.",
  
    keywords: [
      "SleepBull",
      "Mattress",
      "Orthopedic Mattress",
      "Memory Foam Mattress",
      "Latex Mattress",
      "Pocket Spring Mattress",
      "Luxury Mattress",
      "Pillows",
      "Bed Frames",
      "Sleep Accessories",
      "Best Mattress in India",
    ],
  
    // ==========================================
    // Domain
    // ==========================================
    url:
      process.env.NEXT_PUBLIC_SITE_URL ??
      "https://www.sleepbull.com",
  
    baseApiUrl:
      process.env.NEXT_PUBLIC_API_URL ??
      "http://13.55.55.13:4000/api",
  
    // ==========================================
    // Contact
    // ==========================================
    email: "support@sleepbull.com",
  
    supportEmail: "support@sleepbull.com",
  
    phone: "+91 9876543210",
  
    whatsapp: "+919876543210",
  
    // ==========================================
    // Address
    // ==========================================
    address: {
      street: "Your Company Address",
      city: "Bengaluru",
      state: "Karnataka",
      country: "India",
      zip: "560001",
    },
  
    // ==========================================
    // Social Media
    // ==========================================
    social: {
      facebook: "",
  
      instagram: "",
  
      twitter: "",
  
      youtube: "",
  
      linkedin: "",
  
      pinterest: "",
    },
  
    // ==========================================
    // Images
    // ==========================================
    logo: "/logos/logo.svg",
  
    logoDark: "/logos/logo-dark.svg",
  
    favicon: "/favicon.ico",
  
    ogImage: "/images/og-image.jpg",
  
    placeholder: "/images/placeholder.webp",
  
    // ==========================================
    // Company
    // ==========================================
    foundedYear: 2025,
  
    currency: "INR",
  
    currencySymbol: "₹",
  
    language: "en",
  
    locale: "en-IN",
  };