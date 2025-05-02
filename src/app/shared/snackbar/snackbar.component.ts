import { Component, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
    selector: 'app-snackbar',
    imports: [],
    templateUrl: './snackbar.component.html',
    styleUrl: './snackbar.component.scss'
})
export class SnackbarComponent {
    readonly snackBar = inject(MatSnackBar);

    open(message: string, action = '', config?: MatSnackBarConfig) {
        return this.snackBar.open(message, action, config);
    }

}
