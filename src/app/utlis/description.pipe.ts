import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'description'
})
export class DescriptionPipe implements PipeTransform {

  transform(val:string , length?: any):string {
    return (val.length>length)? val.slice(0, 325)+'... <i><u>more</u></i>':val
  }
}
