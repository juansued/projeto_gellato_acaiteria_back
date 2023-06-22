import { products } from '@prisma/client';

//==================== get all ==================

export type ProductBasic = Pick<products, 'id' | 'name' | 'image'>;

//================= update ====================

export interface UpdateProductData {
  id?: number;
  title?: string;
  image?: string;
  price?: number;
  description?: string;
  categoryId?: number;
  unitOfMeasure?: string;
  amount?: number;
  quantityForUnity?: number;
}
