export const colors = {
  primary: "#0D253D",
  primaryHover: "#143A5A",

  secondary: "#C89B3C",
  secondaryHover: "#B48729",

  background: "#FFFFFF",
  section: "#F8FAFC",

  text: {
    primary: "#1F2937",
    secondary: "#4B5563",
    light: "#6B7280",
    white: "#FFFFFF",
  },

  border: "#E5E7EB",
} as const;

export const theme = {
    // ===================================================
    // Brand
    // ===================================================
  
    brand: {
      primary: colors.primary,
      primaryHover: colors.primaryHover,
      secondary: colors.secondary,
      secondaryHover: colors.secondaryHover,
      accent: colors.secondary,
    },
  
    // ===================================================
    // Backgrounds
    // ===================================================
  
    background: {
      body: colors.background,
      section: colors.section,
      card: colors.background,
      dark: colors.primary,
    },
  
    // ===================================================
    // Text Colors
    // ===================================================
  
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
      muted: colors.text.light,
      white: colors.text.white,
      light: colors.text.light,
    },
  
    // ===================================================
    // Border
    // ===================================================
  
    border: {
      light: colors.border,
      DEFAULT: colors.border,
      dark: colors.border,
    },
  
    // ===================================================
    // Status Colors
    // ===================================================
  
    status: {
      success: "#16A34A",
      warning: "#F59E0B",
      error: "#DC2626",
      info: "#2563EB",
    },
  
    // ===================================================
    // Rating
    // ===================================================
  
    rating: {
      active: colors.secondary,
      inactive: colors.border,
    },
  
    // ===================================================
    // Product Badges
    // ===================================================
  
    badge: {
      sale: "#DC2626",
      new: "#16A34A",
      bestseller: colors.secondary,
      limited: "#7C3AED",
    },
  
    // ===================================================
    // Border Radius
    // ===================================================
  
    radius: {
      xs: "4px",
      sm: "8px",
      md: "12px",
      lg: "16px",
      xl: "24px",
      full: "9999px",
    },
  
    // ===================================================
    // Container
    // ===================================================
  
    container: {
      width: "1440px",
      padding: "16px",
    },
  
    // ===================================================
    // Shadows
    // ===================================================
  
    shadow: {
      sm: "0 1px 3px rgba(0,0,0,0.08)",
  
      md: "0 4px 12px rgba(0,0,0,0.08)",
  
      lg: "0 10px 30px rgba(0,0,0,0.12)",
  
      xl: "0 20px 50px rgba(0,0,0,0.15)",
    },
  
    // ===================================================
    // Typography
    // ===================================================
  
    typography: {
      h1: "56px",
      h2: "44px",
      h3: "36px",
      h4: "28px",
      h5: "22px",
      h6: "18px",
  
      body: "16px",
  
      small: "14px",
  
      tiny: "12px",
    },
  
    // ===================================================
    // Header
    // ===================================================
  
    header: {
      height: "80px",
    },
  
    // ===================================================
    // Footer
    // ===================================================
  
    footer: {
      background: colors.primary,
      color: colors.text.white,
    },
  
    // ===================================================
    // Buttons
    // ===================================================
  
    button: {
      height: "52px",
      radius: "12px",
    },
  
    // ===================================================
    // Animation
    // ===================================================
  
    animation: {
      transition: "300ms",
      hoverScale: 1.02,
    },
  } as const;
  
  export type Theme = typeof theme;
