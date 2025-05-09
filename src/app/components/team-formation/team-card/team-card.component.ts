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
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


@Component({
  selector: 'app-team-card',
  standalone: true,
  imports: [MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatProgressBarModule,
    CommonModule,
    DragDropModule,
    MatCardModule,
    MatSlideToggleModule,
    MatProgressBarModule],
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

  // Method to handle the lock event when a student is clicked
  toggleStudentLock(student: Student): void {
    student.locked = !student.locked;
  }


  // Method to handle the drop event when a student is dragged and dropped
  onDrop(event: CdkDragDrop<Student[]>) {
    // Don't allow dropping into a locked team
    if (this.team.locked) return;

    // Check if the dragged student is locked
    const draggedStudent = event.previousContainer.data[event.previousIndex];

    // Don't allow moving a locked student
    if (draggedStudent.locked) return;

    // Check if the drop is within the same team or between different teams
    if (event.previousContainer === event.container) {
      moveItemInArray(this.team.students, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }


  // Method to handle the lock event when the team is clicked
  toggleTeamLock(): void {
    this.team.locked = !this.team.locked;
  }

}
