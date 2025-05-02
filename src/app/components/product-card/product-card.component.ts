import { Component, model, output } from '@angular/core';

import { MatButtonModule } from '@angular/material/button'; // Import Angular Material Button module
import { MatCardModule } from '@angular/material/card'; 
import { Product } from '@app/models/product';
import { CommonModule } from '@angular/common'; // Import CommonModule for Angular directives
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
// import { ApiService } from '@app/services/api.service';
import { DialogViewProductComponent } from '@components/dialogs/dialog-view-product/dialog-view-product.component';
import { DialogUpdateProductComponent } from '../dialogs/dialog-update-product/dialog-update-product.component';
import { DialogDeleteProductComponent } from '../dialogs/dialog-delete-product/dialog-delete-product.component';

@Component({
  selector: 'app-product-card',
  imports: [
    MatButtonModule, 
    MatCardModule, 
    CommonModule, 
    MatChipsModule, 
    MatTooltipModule, 
    MatIconModule, 
    MatMenuModule
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

    image = model<string>();
    product = model.required<Product>();
    productUpdated = output<Product>();
    productDeleted = output<Product>();

    constructor(
        // private apiService: ApiService,
        private dialog: MatDialog
    ) { }


    viewProduct() {
		const dialogRef = this.dialog.open(DialogViewProductComponent, { 
			data: this.product()
		});

		dialogRef.afterClosed().subscribe();
	}

    updateProduct() {
        const dialogRef = this.dialog.open(DialogUpdateProductComponent, { 
            data: this.product()
        });
        
        dialogRef.afterClosed().subscribe((updated_product: Product) => {
            if (updated_product) {
                // this.product.update(() => updated_product);
                this.productUpdated.emit(updated_product);
            }
        });
    }

    deleteProduct() {
        const dialogRef = this.dialog.open(DialogDeleteProductComponent, { 
            data: this.product()
        });
        
        dialogRef.afterClosed().subscribe((deleted_product: Product) => {
            if (deleted_product) {
                this.productDeleted.emit(deleted_product);
            }
        });
    }
}

