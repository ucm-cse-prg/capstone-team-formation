import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { Product } from '@app/models/product';
import { MatCardHarness } from '@angular/material/card/testing';
// import { MatButtonHarness } from '@angular/material/button/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

describe('ProductCardComponent', () => {
    let fixture: ComponentFixture<ProductCardComponent>;
    let component: ProductCardComponent;
    let loader: HarnessLoader;

    const mockProduct: Product = {
        id: '1',
        name: 'Product 1',
        description: 'Description 1',
        price: 10.99,
        category: {
            name: 'Category 1',
            description: 'Category Description',
        }
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            // if ProductCardComponent is standalone:
            imports: [ProductCardComponent]
            // otherwise you'd use `declarations: [ProductCardComponent]`
        }).compileComponents();

        fixture = TestBed.createComponent(ProductCardComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('product', mockProduct); // set the Input before detectChanges
        loader = TestbedHarnessEnvironment.loader(fixture);
        fixture.detectChanges();
    });

    it('should create', () => {
        component.product.set(mockProduct);     // satisfy the required @Input
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should render the product name, description and price', async() => {
        component.product.set(mockProduct);     // set the Input before detectChanges
        fixture.detectChanges();

        expect(component.product()).toEqual(mockProduct);

        const cards = await loader.getAllHarnesses(MatCardHarness);
        expect(cards.length).toBe(1);
        expect(await cards[0].getTitleText()).toBe('Product 1'); // check the title text
        expect(await cards[0].getSubtitleText()).toBe(`Price: $${mockProduct.price}`); // check the subtitle text
    });
});
