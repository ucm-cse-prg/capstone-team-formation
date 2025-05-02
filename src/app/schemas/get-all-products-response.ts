import { GetProductResponse } from './get-product-response';

/**
 * Schema for returning all products.
 *
 * Contains a list of products represented by GetProductResponse.
 * This schema is used for the response of the GET Products endpoint.
 */
export interface GetAllProductsResponse {
    products: GetProductResponse[];
}
