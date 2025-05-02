import { Category } from '@models/category';

/**
 * Schema for updating an existing product.
 *
 * This schema defines the fields that can be updated for a product.
 * All fields are optional since updates may target one or more attributes.
 * This schema is used for the request payload of the PUT Product/{id} endpoint.
 */
export interface UpdateProductRequest {
    category?: Category;
    description?: string;
    name?: string;
    price?: number;
}
