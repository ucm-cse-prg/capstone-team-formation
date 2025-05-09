import {Team} from '@models/team.model';
import {Project} from '@models/project.model';


/**
 * Calculates the skill match percentage between a team and a project.
 * @param team - The team object containing students and their skills.
 * @param project - The project object containing required skills.
 * @returns A number representing the skill match percentage.

 We check what skills the project requires

 Then we look at all students in the team and combine their skills

 Then we compare how many required skills are covered by the team
 */

export function calculateSkillMatch(team: Team, project: Project): number {
  // Check if the team has students
  const required = new Set(project.requiredSkills);

  const combined = new Set(team.students.flatMap(s => s.skills));

  // Check if the team has any skills
  const matched = [...required].filter(skill => combined.has(skill));

  // If no required skills, return 0
  return Math.round((matched.length / required.size) * 100);
}

export function calculatePreferenceScore(team: Team): number {
  // Calculate the average preference score of the students in the team
  if (team.students.length === 0) return 0;
  // If no students, return 0

  // Calculate the total preference score by summing up the individual scores
  const totalPref = team.students.reduce((acc, s) => {
    // For each student, find their preference rank for the project
    const rank = s.preferences.indexOf(team.projectId);
    // If the project is not in the student's preferences, rank will be -1
    return acc + (rank >= 0 ? (100 - rank * 25) : 0); // 1st = 100, 2nd = 75, etc.
  }, 0);
  // Return the average preference score
  return Math.round(totalPref / team.students.length);
}
