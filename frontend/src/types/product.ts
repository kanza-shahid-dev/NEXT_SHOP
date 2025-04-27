export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  coverImage: string;
  imagesData: string[];
  size: string;
  color: string;
}

export interface ProductFormValues {
  name: string;
  price: string;
  image: string;
  imagesData: string[];
  description: string;
  imagePath: File | null;
}
