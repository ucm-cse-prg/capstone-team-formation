import { Category } from '@models/category';

/**
 * Schema for returning the updated product.
 *
 * Inherits from GetProductResponse which includes all product details along with the 'id'.
 * This schema is used for the response of the PUT Product/{id} endpoint.
 */
export interface UpdateProductResponse {
    id: string;
    name: string;
    description: string;
    price: number;
    category: Category;
}
