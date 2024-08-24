export interface Purchase {
  buyer_id: string;
  employee_id: string;
  product_id: string;
  quantity: number;
  subtotal_each: number;
  created_at: Date;
  status: string;
}