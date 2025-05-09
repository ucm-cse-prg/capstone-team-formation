import { Student } from './student.model';

export interface Team {
  id: number;
  projectId: number;
  labId?: number; // optional (pending on if labs consolidate into one)
  students: Student[];
  locked: boolean;
}
