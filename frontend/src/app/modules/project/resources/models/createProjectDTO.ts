export interface CreateProjectDTO {  
  companyId: number,
  userId: number,
  projectId: number,
  name: string,
  address: string,
  startDate: Date
  endDate: Date
}