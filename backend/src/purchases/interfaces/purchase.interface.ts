export interface Purchase {
  readonly buyer_id: string;
  readonly cashier_id: string;
  readonly product_id: string;
  readonly quantity: number;
  readonly total: number;
}