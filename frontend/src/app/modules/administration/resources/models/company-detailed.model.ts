import {ICompanyOverview} from "./company-overview.model";
import {IMember} from "./member.model";
import {IMaterial} from "../../../manage-resources/material/resources/models/material-dto";

export interface ICompanyDetailed extends ICompanyOverview{
  email : string,
  members : IMember[],
  materials:IMaterial[],
  materialTotalCount:number
}
