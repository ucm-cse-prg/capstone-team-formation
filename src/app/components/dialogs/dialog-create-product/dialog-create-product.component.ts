import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '@app/services/api.service';
import { DialogComponent } from '@app/shared/components/dialog/dialog.component';
import { CreateProductRequest } from '@schemas/create-product-request'; // Adjust the import path as necessary

@Component({
    selector: 'app-dialog-create-product',
    imports: [
        DialogComponent, 
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
    ],
    templateUrl: './dialog-create-product.component.html',
    styleUrl: './dialog-create-product.component.scss'
})
export class DialogCreateProductComponent {

    // Define the form group for the product creation form
    form = new FormGroup({
		name: new FormControl("", Validators.required),
		description: new FormControl(""),
        price: new FormControl(0.99, [
            Validators.required,
            Validators.min(0) // Ensure price is non-negative
        ]),
        categoryName: new FormControl("", Validators.required), // Assuming category has a name property
        categoryDescription: new FormControl("")
	});

    // Define the dialog configuration
	title = "Create new product";
	buttons = [
		{
			text: "Cancel",
			color: "basic",
			action: () => {
				this.dialog.close(false);
			}
		},
		{
			text: "Create",
			color: "primary",
			action: this.submitForm.bind(this)
		}
	];
    
	constructor(
		private apiService: ApiService,
		private dialog: MatDialogRef<DialogCreateProductComponent>,
		// private snackBarService: SnackBarService
	) { }

    
	async submitForm() {
        // Mark all fields as touched to trigger validation
		this.form.markAllAsTouched();

        // Check if the form is valid
		if (this.form.valid) {
            // Construct the product request object using CreateProductRequest schema
            const productRequest: CreateProductRequest = {
                name: this.form.value.name as string,
                price: this.form.value.price as number,
                description: this.form.value.description as string,
                category: {
                    name: this.form.value.categoryName || "",
                    description: this.form.value.categoryDescription || "",
                }
            };

            // Call the API to create a product
            const new_product = await this.apiService.createProduct(productRequest);

            // Close the dialog and pass the new product back
            this.dialog.close(new_product);
		}
	}
}
