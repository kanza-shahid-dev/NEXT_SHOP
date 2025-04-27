export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  coverImage: string;
  imageData: { color: string; url: string }[];
  size: string;
  color: string;
}

export interface ProductFormValues {
  name: string;
  price: string;
  image: string;
  imageData: string[];
  description: string;
  imagePath: File | null;
}
