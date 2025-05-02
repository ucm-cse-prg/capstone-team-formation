import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogViewProductComponent } from './dialog-view-product.component';

xdescribe('DialogViewProductComponent', () => {
    let component: DialogViewProductComponent;
    let fixture: ComponentFixture<DialogViewProductComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DialogViewProductComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(DialogViewProductComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    
});

