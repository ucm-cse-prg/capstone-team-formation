import { Component } from '@angular/core';
import {TeamConfigFormComponent} from '@components/team-formation/team-config-form/team-config-form.component';

@Component({
  selector: 'app-team-formation',
  imports: [TeamConfigFormComponent],
  templateUrl: './team-formation.component.html',
  styleUrl: './team-formation.component.scss'
})
export class TeamFormationComponent {
  // Takes one argument (the form data from the child component and emits an event)
  // logs data and will later be used to trigger team generation
  handleConfig(config: { teamSize: number; preferenceWeight?: number; labLockProject?: number }) {
    console.log('Form submitted:', config);
    // TODO: generate teams, update service state, etc.
  }

}
