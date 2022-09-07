import {ICompanyOverview} from "./company-overview.model";
import {IMember} from "./member.model";
import {IMaterial} from "../../../manage-resources/material/resources/models/material-dto";
import {ICompanyProject} from "./company-project.model"

export interface ICompanyDetailed extends ICompanyOverview{
  email : string,
  members : IMember[],
  materials:IMaterial[],
  materialTotalCount:number
  projects: ICompanyProject[]
  projectsTotalCount: number
}
