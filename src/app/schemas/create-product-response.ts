import { Category } from '@models/category';

/**
 * Schema for returning the newly created product.
 *
 * Inherits from the Product model and includes an additional 'id' field.
 * This schema is used for the response of the POST Product endpoint.
 */
export interface CreateProductResponse {
    id: string;
    name: string;
    description: string;
    price: number;
    category: Category;
}
