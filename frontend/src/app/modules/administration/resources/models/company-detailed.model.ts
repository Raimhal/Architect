import { ICompanyOverview } from './company-overview.model';
import { IMember } from './member.model';

export interface ICompanyDetailed extends ICompanyOverview {
  email: string;
  members: IMember[];
}
