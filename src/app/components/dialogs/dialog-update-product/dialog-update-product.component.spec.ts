import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogUpdateProductComponent } from './dialog-update-product.component';

xdescribe('DialogUpdateProductComponent', () => {
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        DialogUpdateProductComponent
      ],
      declarations: []
    }).compileComponents();

    dialog = TestBed.inject(MatDialog);
  });

  it('should open the dialog and create a form with the passed-in product data', () => {
    const mockProduct = {
      id: 1,
      name: 'Test Product',
      description: 'Test Description',
      price: 100,
      image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      category: 'Test Category',
      stock: 10,
      rating: 4.5,
      reviews: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // open the dialog
    const dialogRef = dialog.open(DialogUpdateProductComponent, {
      data: mockProduct
    });

    const instance = dialogRef.componentInstance;

    // form should exist
    expect(instance.form).toBeDefined();

    // it should have controls for each field
    expect(instance.form.contains('name')).toBeTrue();
    expect(instance.form.contains('description')).toBeTrue();
    expect(instance.form.contains('price')).toBeTrue();
    expect(instance.form.contains('category')).toBeTrue();

    // and default values should match the injected data
    expect(instance.form.get('name')?.value).toBe(mockProduct.name);
    expect(instance.form.get('price')?.value).toBe(mockProduct.price);
    // expect(instance.form.get('category')?.value).toBe(mockProduct.category);

    dialogRef.close();
  });
});
