import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateProductComponent } from './dialog-create-product.component';

xdescribe('DialogCreateProductComponent', () => {
  let component: DialogCreateProductComponent;
  let fixture: ComponentFixture<DialogCreateProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCreateProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCreateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
