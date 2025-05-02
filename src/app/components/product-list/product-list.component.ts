import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { Product } from '@models/product';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateProductComponent } from '../dialogs/dialog-create-product/dialog-create-product.component';
import { ProductCardComponent } from '../product-card/product-card.component'; // Import the ProductCardComponent
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-product-list',
    imports: [CommonModule, MatIconModule, ProductCardComponent, MatButtonModule],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
    products: Product[] = []; // Array to hold the list of products

    constructor(
        private apiService: ApiService,
        private dialog: MatDialog
    ) { }

    async ngOnInit() {
        this.products = await this.apiService.getAllProducts();
    }

    createProduct() {
		const dialogRef = this.dialog.open(DialogCreateProductComponent);

		dialogRef.afterClosed().subscribe((new_product: Product) => {
            if (new_product) {
                this.products.push(new_product);
            }
        });
	}
    
    updateProduct(updated_product: Product) {
        const index = this.products.findIndex(product => product.id === updated_product.id);
        if (index !== -1) {
            this.products[index] = updated_product;
        }
    }

    deleteProduct(product: Product) {
        const index = this.products.findIndex(p => p.id === product.id);
        if (index !== -1) {
            this.products.splice(index, 1);
        }
    }
}
