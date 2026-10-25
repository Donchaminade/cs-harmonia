export type AcademicCycle = 'jardin' | 'primaire' | 'college' | 'lycee';
export interface ClassGrade { id: string; name: string; cycle: AcademicCycle; tuitionFee: number }
