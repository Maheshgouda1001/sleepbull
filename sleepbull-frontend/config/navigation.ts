export interface NavigationItem {
    title: string;
    href: string;
    description?: string;
    children?: NavigationItem[];
  }
  
  export const navigation = [
    {
      title: "Home",
      href: "/",
    },
  
    {
      title: "Mattresses",
      href: "/categories/mattresses",
      children: [
        {
          title: "Latex Mattress",
          href: "/categories/latex-mattress",
          description: "Natural breathable sleep",
        },
        {
          title: "Orthopedic Mattress",
          href: "/categories/orthopedic-mattress",
          description: "Back support for healthy sleep",
        },
        {
          title: "Spring Mattress",
          href: "/categories/spring-mattress",
          description: "Luxury hotel comfort",
        },
        {
          title: "HR Foam Mattress",
          href: "/categories/hr-foam-mattress",
          description: "Responsive high-resilience foam",
        },
      ],
    },

    {
      title: "Pillows",
      href: "/categories/pillows",
      children: [
        {
          title: "Latex Pillow",
          href: "/categories/latex-pillow",
          description: "Natural latex neck support",
        },
        {
          title: "Memory Pillow",
          href: "/categories/memory-pillow",
          description: "Adaptive pressure relief",
        },
        {
          title: "Fiber Pillow",
          href: "/categories/fiber-pillow",
          description: "Soft everyday comfort",
        },
      ],
    },
  
    // {
    //   title: "Bed Frames",
    //   href: "/categories/bed-frames",
    // },
  
    // {
    //   title: "Accessories",
    //   href: "/categories/accessories",
    // },
  
    // {
    //   title: "Offers",
    //   href: "/offers",
    // },
  
    // {
    //   title: "Blogs",
    //   href: "/blogs",
    // },
  
    // {
    //   title: "About",
    //   href: "/about",
    // },
  
    // {
    //   title: "Contact",
    //   href: "/contact",
    // },
  ];
  
  export const footerNavigation = {
    shop: [
      {
        title: "Mattresses",
        href: "/categories/mattresses",
      },
      {
        title: "Pillows",
        href: "/categories/pillows",
      },
      {
        title: "Bed Frames",
        href: "/categories/bed-frames",
      },
      {
        title: "Accessories",
        href: "/categories/accessories",
      },
    ],
  
    company: [
      {
        title: "About Us",
        href: "/about",
      },
      {
        title: "Blogs",
        href: "/blogs",
      },
      {
        title: "Contact",
        href: "/contact",
      },
      {
        title: "FAQ",
        href: "/faq",
      },
    ],
  
    support: [
      {
        title: "Privacy Policy",
        href: "/privacy-policy",
      },
      {
        title: "Terms & Conditions",
        href: "/terms",
      },
      {
        title: "Shipping Policy",
        href: "/shipping-policy",
      },
      {
        title: "Refund Policy",
        href: "/refund-policy",
      },
    ],
  };
  
  export const mobileBottomNavigation = [
    {
      title: "Home",
      href: "/",
      icon: "House",
    },
    {
      title: "Categories",
      href: "/categories",
      icon: "LayoutGrid",
    },
    {
      title: "Cart",
      href: "/cart",
      icon: "ShoppingCart",
    },
    {
      title: "Wishlist",
      href: "/wishlist",
      icon: "Heart",
    },
    {
      title: "Profile",
      href: "/profile",
      icon: "User",
    },
  ];