import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '@app/services/api.service';
import { Product } from '@app/models/product';
import { DialogUpdateProductComponent } from '../dialog-update-product/dialog-update-product.component';
import { DialogComponent } from '@app/shared/components/dialog/dialog.component';

@Component({
  selector: 'app-dialog-delete-product',
  imports: [
    DialogComponent,
  ],
  templateUrl: './dialog-delete-product.component.html',
  styleUrl: './dialog-delete-product.component.scss'
})
export class DialogDeleteProductComponent {

    // Define the dialog configuration
    title = "Delete product";
    buttons = [
        {
            text: "Cancel",
            color: "primary",
            action: () => {
                this.dialog.close(false);
            }
        },
        {
            text: "Delete",
            color: "warn",
            action: this.submitForm.bind(this)
        }
    ];

    constructor(
        private apiService: ApiService,
        private dialog: MatDialogRef<DialogUpdateProductComponent>,
        @Inject(MAT_DIALOG_DATA) public product: Product
    ) {

    }

    async submitForm() {

        // Call the API to delete the product
        await this.apiService.deleteProduct(this.product.id);

        // Close the dialog and pass the new product back
        this.dialog.close(this.product);
	}
}
