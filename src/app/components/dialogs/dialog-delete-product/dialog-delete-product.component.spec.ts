import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteProductComponent } from './dialog-delete-product.component';

xdescribe('DialogDeleteProductComponent', () => {
  let component: DialogDeleteProductComponent;
  let fixture: ComponentFixture<DialogDeleteProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDeleteProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDeleteProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
