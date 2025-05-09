import {Component, Input} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {Team} from '@models/team.model';
import { DragDropModule } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-team-card',
  standalone: true,
  imports: [MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatProgressBarModule,
  CommonModule,
  DragDropModule],
  templateUrl: './team-card.component.html',
  styleUrl: './team-card.component.scss'
})
export class TeamCardComponent {
  // Input property to receive the list of teams from the parent component
  @Input() team!: Team;
}
