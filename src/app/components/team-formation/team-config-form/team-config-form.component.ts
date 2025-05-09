import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-team-config-form',
  imports: [MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            MatSelectModule,],
  templateUrl: './team-config-form.component.html',
  styleUrl: './team-config-form.component.scss'
})
export class TeamConfigFormComponent {

}
