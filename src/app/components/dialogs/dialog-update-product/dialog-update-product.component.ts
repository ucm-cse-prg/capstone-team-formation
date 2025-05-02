import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '@app/services/api.service';
import { DialogComponent } from '@app/shared/components/dialog/dialog.component';
import { CreateProductRequest } from '@schemas/create-product-request'; // Adjust the import path as necessary
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '@app/models/product';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-dialog-update-product',
    imports: [
        DialogComponent, 
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatButtonModule
    ],
    templateUrl: './dialog-update-product.component.html',
    styleUrl: './dialog-update-product.component.scss'
})
export class DialogUpdateProductComponent {

    uploadedImage?: string;

    // Define the form group for the product creation form
    form = new FormGroup({
		name: new FormControl("", Validators.required),
		description: new FormControl(""),
        price: new FormControl(0.99, [
            Validators.required,
            Validators.min(0) // Ensure price is non-negative
        ]),
        categoryName: new FormControl("", Validators.required), // Assuming category has a name property
        categoryDescription: new FormControl(""),
        image: new FormControl("")
	});

    // Define the dialog configuration
	title = "Update product";
	buttons = [
		{
			text: "Cancel",
			color: "basic",
			action: () => {
				this.dialog.close(false);
			}
		},
		{
			text: "Save",
			color: "primary",
			action: this.submitForm.bind(this)
		}
	];
    
	constructor(
		private apiService: ApiService,
		private dialog: MatDialogRef<DialogUpdateProductComponent>,
		@Inject(MAT_DIALOG_DATA) public product: Product
	) {
        this.form.setValue({
            name: product.name,
            description: product.description,
            price: product.price,
            categoryName: product.category.name,
            categoryDescription: product.category.description || "",
            image: product.image || "https://material.angular.io/assets/img/examples/shiba2.jpg"
        });
    }

    
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
            const updated_product = await this.apiService.updateProduct(this.product.id, productRequest);

            // Close the dialog and pass the new product back
            this.dialog.close(updated_product);
		}
	}

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            // Handle the file upload here
            console.log(file);
        }
    }
}
