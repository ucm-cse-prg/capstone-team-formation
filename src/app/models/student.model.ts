export interface Student {
  id: number;
  name: string;
  skills: string[];
  preferences: number[]; // project IDs ranked by preference
  locked: boolean;
}
