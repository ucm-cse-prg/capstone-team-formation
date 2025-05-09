import {Component} from '@angular/core';
import {TeamConfigFormComponent} from '@components/team-formation/team-config-form/team-config-form.component';
import {Team} from '@models/team.model';
import {TeamListComponent} from '@components/team-formation/team-list/team-list.component';

@Component({
  selector: 'app-team-formation',
  imports: [TeamConfigFormComponent, TeamListComponent],
  templateUrl: './team-formation.component.html',
  styleUrl: './team-formation.component.scss'
})
export class TeamFormationComponent {
  teams: Team[] = []; // Array to hold the teams



  // Takes one argument (the form data from the child component and emits an event)
  // logs data and will later be used to trigger team generation
  handleConfig(config: { teamSize: number; preferenceWeight?: number; labLockProject?: number }) {
    console.log('Form submitted:', config);
    // TODO: generate teams, update service state, etc.
    // ------xxxxxxxxxxxxxx,------------------------


    // MOCK DATA FOR NOW
    // If Alice is assigned to project 2 -> her preference score = 100%
    //
    // If assigned to project 1 -> score = 75%
    //
    // If assigned to project 3 -> score = 50%
    //
    // If project not in her list -> score = 0%
    this.teams = [
      {
        id: 1,
        projectId: config.labLockProject || 1,
        students: [
          { id: 1, name: 'Alice', skills: ['Python'], preferences: [1, 2], locked: false },
          { id: 2, name: 'Bob', skills: ['C++'], preferences: [2, 1], locked: false }
        ],
        locked: false
      },
      {
        id: 2,
        projectId: 2,
        students: [],
        locked: false
      }
    ];
  }
}
