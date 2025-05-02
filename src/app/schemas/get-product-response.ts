import { Category } from '@models/category';

/**
 * Schema for returning a single product.
 *
 * Inherits from Product model and adds an 'id' field.
 * This schema is used for the response of the GET Product/{id} endpoint.
 */
export interface GetProductResponse {
    id: string;
    name: string;
    description: string;
    price: number;
    category: Category;
}
