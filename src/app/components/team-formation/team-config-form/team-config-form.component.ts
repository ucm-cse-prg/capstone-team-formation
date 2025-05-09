import {Component, EventEmitter, Output} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';


@Component({
  selector: 'app-team-config-form',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule, ReactiveFormsModule,],
  templateUrl: './team-config-form.component.html',
  styleUrl: './team-config-form.component.scss'
})
export class TeamConfigFormComponent {
  // Event emitter to notify parent component about form submission
  @Output() configSubmitted = new EventEmitter<{
    teamSize: number;
    preferenceWeight?: number;
    labLockProject?: number;
  }>();

  configForm: FormGroup;

  // Sample projects (replace with real data or inject service later)
  projectOptions = [
    { id: 1, title: 'Crop Disease Prediction' },
    { id: 2, title: 'IoT Sensor Grid for Air Quality' },
    { id: 3, title: 'Autonomous Rover for Field Mapping' }
  ];

  // logic for team formation
  constructor(private fb: FormBuilder) {
    // Initialize the form with default values and validators
    this.configForm = this.fb.group({
      teamSize: [3, [Validators.required, Validators.min(1)]],
      preferenceWeight: [null],
      labLockProject: [null]
    });
  }

  // Method to handle form submission
  onSubmit(): void {
    // Check if the form is valid before emitting the event
    if (this.configForm.valid) {
      this.configSubmitted.emit(this.configForm.value);
    }
  }
}
