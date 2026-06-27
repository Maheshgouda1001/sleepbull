export function formatPrice(price: number): string {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  }
  
  export function discountPercentage(
    mrp: number,
    sellingPrice: number
  ): number {
    return Math.round(
      ((mrp - sellingPrice) / mrp) * 100
    );
  }
  
  export function capitalize(text: string) {
    return text
      .split(" ")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1)
      )
      .join(" ");
  }
  
  export function truncate(
    text: string,
    length = 100
  ) {
    if (text.length <= length) return text;
  
    return text.substring(0, length) + "...";
  }
  
  export function createSlug(text: string) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  }