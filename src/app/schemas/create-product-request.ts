// This file contains the schema for creating a new product request.
import { Category } from '@models/category';

/**
 * Schema for creating a new product.
 *
 * Inherits from the Product model.
 * This schema is used for the request payload of the POST Product endpoint.
 */
export interface CreateProductRequest {
    name: string;
    description?: string;
    price: number;
    category: Category;
}
