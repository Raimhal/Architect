import { environment } from "src/environments/environment";

export function getImageLink (image: string){
  return image === '' ?  `../assets/dummy.png` : environment.production ? image : `${environment.filesBaseUrl}/${image}`
}