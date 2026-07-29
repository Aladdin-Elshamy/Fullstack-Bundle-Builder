interface Product {
  id: string;
  category: "camera" | "sensor" | "accessory" | "plan";
  name: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  colors?: {
    name: string;
    value: string;
    image?: string;
  }[];
  required?: boolean;
  quantity: number;
}

export { Product };
