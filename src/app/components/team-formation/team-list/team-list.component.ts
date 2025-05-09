import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeamCardComponent} from '@components/team-formation/team-card/team-card.component';
import {Team} from '@models/team.model';
import {Project} from '@models/project.model';

@Component({
  selector: 'app-team-list',
  imports: [CommonModule,
    TeamCardComponent,
  ],
  templateUrl: './team-list.component.html',
  styleUrl: './team-list.component.scss'
})
// The TeamListComponent responsible for displaying a list of teams.
export class TeamListComponent {
  // Input property to receive the list of teams from the parent component
  @Input() teams: Team[] = [];

  // projects array to hold the available projects
  projects: Project[] = [
    {id: 1, title: 'Crop Detection', proposal: '', requiredSkills: ['Python', 'TensorFlow']},
    {id: 2, title: 'IoT Monitoring', proposal: '', requiredSkills: ['C++', 'Sensors']},
    {id: 3, title: 'Web Dashboard', proposal: '', requiredSkills: ['Angular', 'Firebase']}
  ];

  // Method to get the project by its ID
  getProjectById(id: number): Project {
    return this.projects.find(p => p.id === id)!;
  }
}

