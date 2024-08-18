export interface Category {
  id: string;
  name: string;
  image_url: string;
  is_archived: boolean;
  created_at: Date;
  updated_at: Date;
  last_updated_by: string;
  upload_id: string;
}