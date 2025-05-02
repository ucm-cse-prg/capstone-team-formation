import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

interface DialogButton {
	text: string;
	action: () => void;
	color: string | "primary";
}

@Component({
  selector: 'app-dialog',
  imports: [
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
    dialogTitle = input<string>('');
	dialogMessage = input<string>('');
	dialogButtons = input<DialogButton[]>([
		{
			text: "Ok",
			action: () => {
				this.dialogRef.close();
			},
			color: "primary"
		},
	]);

	constructor(public dialogRef: MatDialogRef<DialogComponent>){
	}
}
