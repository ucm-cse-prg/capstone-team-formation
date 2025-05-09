import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeamCardComponent} from '@components/team-formation/team-card/team-card.component';

@Component({
  selector: 'app-team-list',
  imports: [CommonModule,
            TeamCardComponent],
  templateUrl: './team-list.component.html',
  styleUrl: './team-list.component.scss'
})
export class TeamListComponent {

}
