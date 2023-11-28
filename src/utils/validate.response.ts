import { ProductInputtableTypes } from "../database/models/product.model";

function validateParamsCreateProduct({
    name,
    price,
    orderId,

  }: ProductInputtableTypes): string | null {
    if (!name) return 'Name is required';
    if (!price) return 'Price is required';
    if (!orderId) return 'OrderId is required';
    
    return null;
  };

export default validateParamsCreateProduct;