import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ApiService } from '@app/services/api.service';
// import { MatDialog } from '@angular/material/dialog';
import { Product } from '@models/product';
// import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
// import { HarnessLoader } from '@angular/cdk/testing';
// import { MatDialogHarness } from '@angular/material/dialog/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { GetAllProductsResponse } from '@app/schemas/get-all-products-response';


describe('ProductListComponent', () => {

    const API_URL = 'http://localhost:8000/products/';

    let component: ProductListComponent;
    // let loader: HarnessLoader;
    let fixture: ComponentFixture<ProductListComponent>;
    // let apiService: ApiService;
    // let products: Promise<Product[]>;
    let httpTesting: HttpTestingController;

    const mockProducts: Product[] = [
        {
            id: '1',
            name: 'Product 1',
            description: 'Description 1',
            price: 10.99,
            category: {
                name: 'Category 1',
                description: 'Category Description',
            }
        },
        {
            id: '2',
            name: 'Product 2',
            description: 'Description 2',
            price: 20.99,
            category: {
                name: 'Category 2',
                description: 'Category Description',
            }
        }
    ];

    const mockResponse: GetAllProductsResponse = {
        products: mockProducts
    };

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [
                ProductListComponent,
            ],
            providers: [
                ApiService,
                provideHttpClient(),
                provideHttpClientTesting(),
            ]
        }).compileComponents();

        httpTesting = TestBed.inject(HttpTestingController);
        // apiService = TestBed.inject(ApiService);
        fixture = TestBed.createComponent(ProductListComponent);
        // loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load products and create product cards', waitForAsync(() => {
        fixture.detectChanges();

        const req = httpTesting.expectOne(API_URL);
        req.flush(mockResponse);
        httpTesting.verify();

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(component.products).toBe(mockProducts);

            const productCards = fixture.nativeElement.querySelectorAll('app-product-card');
            expect(productCards.length).toBe(mockProducts.length);
        });
    }));
});
