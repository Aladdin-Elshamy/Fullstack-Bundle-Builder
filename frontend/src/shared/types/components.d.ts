interface Product {
  id: string;
  category: "camera" | "sensor" | "accessory" | "plan";
  name: string;
  description: string;
  image?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  options?: {
    variant_name: string;
    color_value: string;
    image?: string;
  }[];
  required?: boolean;
  quantity: number;
}

export { Product };
