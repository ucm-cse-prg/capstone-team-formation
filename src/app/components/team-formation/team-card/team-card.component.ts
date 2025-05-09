import {Component, Input} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {Team} from '@models/team.model';
import {CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {calculatePreferenceScore, calculateSkillMatch} from '@services/team-utils';
import {Project} from '@models/project.model';
import {Student} from '@models/student.model';


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
  @Input() allTeams!: Team[]; // ended up needing to build connected list IDs
  @Input() project!: Project;

  get connectedDropListIds(): string[] {
    return this.allTeams
      .filter(t => t.id !== this.team.id)
      .map(t => `team-${t.id}`);
  }

  // getter methods, meaning they are automatically re-evaluated anytime this.team or this.project changes. no need to manually call them.
  get skillMatch(): number {
    return calculateSkillMatch(this.team, this.project);
  }

  get preferenceScore(): number {
    return calculatePreferenceScore(this.team);
  }

  getPreferenceRank(student: Student): number | null {
    const rank = student.preferences.indexOf(this.project.id);
    return rank >= 0 ? rank : null;
  }

  getOrdinalSuffix(n: number): string {
    if (n === 1) return 'st';
    if (n === 2) return 'nd';
    if (n === 3) return 'rd';
    return 'th';
  }


  // Method to handle the drop event when a student is dragged and dropped
  onDrop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      // If the item is dropped in the same container, move it within the array
      moveItemInArray(this.team.students, event.previousIndex, event.currentIndex);
    } else {
      // If the item is dropped in a different container, transfer it
      const draggedStudent = event.previousContainer.data[event.previousIndex];

      // Prevent drop if student is locked
      if (draggedStudent.locked) return;

      // Check if the student is already in the target team
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
