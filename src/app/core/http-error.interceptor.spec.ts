import { TestBed } from '@angular/core/testing';
import { httpErrorInterceptor } from './http-error.interceptor';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApiService } from '@app/services/api.service';
import { SnackBarService } from '@app/services/snackbar.service';
import { CreateProductRequest } from '@app/schemas/create-product-request';
import { Router } from '@angular/router';

describe('httpErrorInterceptor', () => {
    let apiService: ApiService;
    // let interceptor: httpErrorInterceptor;
    let httpTesting: HttpTestingController;
    let snackBarSpy: jasmine.SpyObj<SnackBarService>;
    let routerSpy: jasmine.SpyObj<Router>;

    beforeEach(() => {
        snackBarSpy = jasmine.createSpyObj('SnackBarService', ['openSnackBar']);
        routerSpy = jasmine.createSpyObj('Router', ['navigate']);

        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting(),
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: httpErrorInterceptor,
                    multi: true
                },
                { provide: SnackBarService, useValue: snackBarSpy },
                { provide: Router, useValue: routerSpy },
            ]
        });

        // interceptor = TestBed.inject(httpErrorInterceptor);
        apiService = TestBed.inject(ApiService);
        httpTesting = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        const interceptor = TestBed.inject(httpErrorInterceptor);
        expect(interceptor).toBeTruthy();
    });


    it('should call openSnackBar on 422', () => {
        const errorResponse = {
            "detail": [
                {
                    "type": "value_error",
                    "loc": [
                        "body",
                        "price"
                    ],
                    "msg": "Value error, Price must end with 0.99",
                    "input": 100,
                    "ctx": {
                        "error": {}
                    }
                }
            ]
        };


        // Mock the API call
        const reqBody: CreateProductRequest = {
            name: 'Test Product',
            description: 'Test Description',
            price: 100,
            category: {
                name: 'Test Category',
                description: 'Test Category Description'
            }
        };

        // fire the request and subscribe so interceptor runs
        apiService.createProduct(reqBody);

        const req = httpTesting.expectOne('http://localhost:8000/products/');
        req.flush(errorResponse, { status: 422, statusText: 'Unprocessable Entity' });
        httpTesting.verify();

        expect(snackBarSpy.openSnackBar).toHaveBeenCalledWith(
            'Value error, Price must end with 0.99',
            'Close',
            'error'
        );
    });
});
