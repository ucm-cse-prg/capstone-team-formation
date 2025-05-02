import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { CreateProductResponse } from '@schemas/create-product-response';
import { GetAllProductsResponse } from '@schemas/get-all-products-response';
import { GetProductResponse } from '@schemas/get-product-response';

import { Product } from '@models/product';
import { CreateProductRequest } from '@app/schemas/create-product-request';
import { UpdateProductRequest } from '@app/schemas/update-product-request';

const API_URL = 'http://localhost:8000'; // Replace with your actual API URL, make sure to not include a trailing slash


@Injectable({ providedIn: 'root' })
export class ApiService {
    constructor(private http: HttpClient) {}
    
    /**
     * Get Products.
     *
     * Retrieve all products.
     *
     * This endpoint returns a list of all products in the database.
     * It uses the get_all_products action to fetch product data.
     *
     * Returns:
     *     array: A list of product objects, each containing details about a product.
     */

    async getAllProducts(): Promise<Product[]> {
        const response = await firstValueFrom(this.http.get<GetAllProductsResponse>(`${API_URL}/products/`));
        return response.products || [];
    }

    /**
     * Create Product.
     *
     * Create a new product.
     *
     * This endpoint accepts product data as input and creates a new product
     * using the create_product action. The response returns the created product details.
     *
     * Args:
     *     product (Schemas.CreateProductRequest): The product creation request payload.
     *
     * Returns:
     *     Schemas.CreateProductResponse: The newly created product details.
     */

    async createProduct(product: CreateProductRequest): Promise<CreateProductResponse> {
        const response = await firstValueFrom(this.http.post<CreateProductResponse>(`${API_URL}/products/`, product));
        return response;
    }

    /**
     * Get Product.
     *
     * Retrieve a single product by its ID.
     *
     * Args:
     *     product_id (PydanticObjectId): The unique identifier of the product.
     *
     * Returns:
     *     Schemas.GetProductResponse: The product data corresponding to the given ID.
     */
    
    async getProduct(productId: string): Promise<Product> {
        const response = await firstValueFrom(this.http.get<GetProductResponse>(`${API_URL}/products/${productId}/`));
        return response;
    }

    /**
     * Delete Product.
     *
     * Delete a product.
     *
     * This endpoint deletes the specified product. It returns a 204 status code
     * upon successful deletion. If the product is not found, a 404 response is returned.
     *
     * Args:
     *     product (Documents.Product): The product instance retrieved via dependency injection.
     *
     * Returns:
     *     int: HTTP status code 204 on successful deletion.
     */

    async deleteProduct(productId: string): Promise<void> {
        await firstValueFrom(this.http.delete(`${API_URL}/products/${productId}/`));
    }

    /**
     * Update Product.
     *
     * Update an existing product.
     *
     * This endpoint updates the product identified by the provided product dependency.
     * The update action is performed using the details from the request body.
     *
     * Args:
     *     request_body (Schemas.UpdateProductRequest): The payload containing updated data.
     *     product (Documents.Product): The product instance retrieved via dependency injection.
     *
     * Returns:
     *     Schemas.UpdateProductResponse: The updated product details.
     */

    async updateProduct(productId: string, product: UpdateProductRequest): Promise<UpdateProductRequest> {
        const response = await firstValueFrom(this.http.patch<UpdateProductRequest>(`${API_URL}/products/${productId}/`, product));
        return response;
    }
    
}
