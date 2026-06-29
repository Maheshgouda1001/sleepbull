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
          title: "Comfort Mattress",
          href: "/categories/comfort-mattresses",
          description: "Balanced comfort for everyday sleep",
        },
        {
          title: "Latex Mattress",
          href: "/categories/latex",
          description: "Natural breathable sleep",
        },
        {
          title: "Orthopedic Mattress",
          href: "/categories/orthopedic-mattresses",
          description: "Back support for healthy sleep",
        },
        {
          title: "Pocket Spring Mattress",
          href: "/categories/pocket-spring",
          description: "Luxury hotel comfort",
        },
      ],
    },
  
    {
      title: "Pillows",
      href: "/categories/pillows",
    },
  
    {
      title: "Bed Frames",
      href: "/categories/bed-frames",
    },
  
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