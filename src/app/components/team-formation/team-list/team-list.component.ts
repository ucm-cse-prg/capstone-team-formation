import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeamCardComponent} from '@components/team-formation/team-card/team-card.component';
import {Team} from '@models/team.model';

@Component({
  selector: 'app-team-list',
  imports: [CommonModule,
            TeamCardComponent],
  templateUrl: './team-list.component.html',
  styleUrl: './team-list.component.scss'
})
// The TeamListComponent responsible for displaying a list of teams.
export class TeamListComponent {
  // Input property to receive the list of teams from the parent component
  @Input() teams: Team[] = [];
}

