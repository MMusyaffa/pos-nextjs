export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category_id: string;
  image_url: string;
  is_archived: boolean;
  created_at: Date;
  updated_at: Date;
  last_updated_by: string;
  upload_id: string;
}