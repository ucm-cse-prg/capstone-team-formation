import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '@app/services/api.service';
import { DialogComponent } from '@app/shared/components/dialog/dialog.component';
import { Product } from '@app/models/product';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-dialog-view-product',
    imports: [
    DialogComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule, 
    MatCardModule, 
    CommonModule, 
    MatChipsModule, 
    MatTooltipModule, 
    MatMenuModule
],
    templateUrl: './dialog-view-product.component.html',
    styleUrl: './dialog-view-product.component.scss'
})
export class DialogViewProductComponent{

    // Define the dialog configuration
	buttons = [
		{
			text: "close",
			color: "primary",
			action: () => this.dialog.close(),
		}
	];
    
	constructor(
		private apiService: ApiService,
		private dialog: MatDialogRef<DialogViewProductComponent>,
        @Inject(MAT_DIALOG_DATA) public product: Product 
		// private snackBarService: SnackBarService
	) {
        // For testing purposes
        this.product.image = this.product.image || 'https://material.angular.io/assets/img/examples/shiba2.jpg';
    }
}
