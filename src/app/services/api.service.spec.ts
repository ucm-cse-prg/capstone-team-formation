import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { ApiService } from './api.service';
import { httpErrorInterceptor } from '@app/core/http-error.interceptor';
import { Product } from '@app/models/product';
import { GetAllProductsResponse } from '@app/schemas/get-all-products-response';
import { CreateProductRequest } from '@app/schemas/create-product-request';
import { CreateProductResponse } from '@app/schemas/create-product-response';
import { SnackbarComponent } from '@app/shared/snackbar/snackbar.component';

describe('ApiService', () => {
    let service: ApiService;
    let httpTesting: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            // imports: 
            providers: [
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting(),
                ApiService,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: httpErrorInterceptor,
                    multi: true
                },
                SnackbarComponent,
            ]
        });
        service = TestBed.inject(ApiService);
        httpTesting = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should have a defined Product CRUD', () => {
        expect(service.getAllProducts).toBeDefined();
        expect(service.createProduct).toBeDefined();
        expect(service.getProduct).toBeDefined();
        expect(service.updateProduct).toBeDefined();
        expect(service.deleteProduct).toBeDefined();
    });

    it('should call getAllProducts and return products', async () => {
        const mockProducts: Product[] = [
            {
                id: '1',
                name: 'Product 1',
                description: 'Description 1',
                price: 10.99,
                category: {
                    name: 'Category 1',
                    description: 'Category Description 1',
                }
            }
        ];

        const mockResponse: GetAllProductsResponse = {
            products: mockProducts
        };

        const products = service.getAllProducts();

        const req = httpTesting.expectOne('http://localhost:8000/products/');
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);

        expect(await products).toEqual(mockResponse.products);

        httpTesting.verify();
    });

    it('should call createProduct and return created product', async () => {
        
        const mockProduct: Product = {
            id: '1',
            name: 'Product 1',
            description: 'Description 1',
            price: 10.99,
            category: {
                name: 'Category 1',
                description: 'Category Description 1',
            }
        };

        const reqBody: CreateProductRequest = {
            name: mockProduct.name,
            description: mockProduct.description,
            price: mockProduct.price,
            category: {
                name: mockProduct.category.name,
                description: mockProduct.category.description,
            }
        };

        const mockResponse: CreateProductResponse = {
            id: mockProduct.id,
            name: mockProduct.name,
            description: mockProduct.description,
            price: mockProduct.price,
            category: {
                name: mockProduct.category.name,
                description: mockProduct.category.description,
            }
        };

        const createdProduct = service.createProduct(reqBody);

        const req = httpTesting.expectOne('http://localhost:8000/products/');
        expect(req.request.method).toBe('POST');
        req.flush(mockResponse);

        expect(await createdProduct).toEqual(mockResponse);
    });

    it('should call getProduct and return a product', async () => {
        const mockProduct: Product = {
            id: '1',
            name: 'Product 1',
            description: 'Description 1',
            price: 10.99,
            category: {
                name: 'Category 1',
                description: 'Category Description 1',
            }
        };

        const mockResponse: Product = {
            ...mockProduct
        };

        const productId = '1';
        const product = service.getProduct(productId);

        const req = httpTesting.expectOne(`http://localhost:8000/products/${productId}/`);
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);

        expect(await product).toEqual(mockResponse);
    });

    it('should call updateProduct and return updated product', async () => {
        const mockProduct: Product = {
            id: '1',
            name: 'Product 1',
            description: 'Description 1',
            price: 10.99,
            category: {
                name: 'Category 1',
                description: 'Category Description 1',
            }
        };

        const mockResponse: Product = {
            ...mockProduct
        };

        const productId = '1';
        const updatedProduct = service.updateProduct(productId, mockProduct);

        const req = httpTesting.expectOne(`http://localhost:8000/products/${productId}/`);
        expect(req.request.method).toBe('PATCH');
        req.flush(mockResponse);

        expect(await updatedProduct).toEqual(mockResponse);
    });

    it('should call deleteProduct and return void', async () => {
        const productId = '1';
        const response = service.deleteProduct(productId);

        const req = httpTesting.expectOne(`http://localhost:8000/products/${productId}/`);
        expect(req.request.method).toBe('DELETE');
        req.flush({});

        expect(await response).toBeUndefined();
    });

    afterEach(() => {
        httpTesting.verify();
    });
    
    afterAll(() => {
        TestBed.resetTestingModule();
    });
});
