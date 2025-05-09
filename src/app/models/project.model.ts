export interface Project {
  id: number;
  title: string;
  proposal: string;
  requiredSkills: string[];
  labLockId?: number; // if locked to a specific lab
}
