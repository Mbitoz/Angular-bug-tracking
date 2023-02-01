import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
  name: 'underscore'
})
export class UnderscorePipe implements PipeTransform {
  transform(type: string): string {
    if(type){
      return type.replace(/\_/g, ' ');
    }
  }
}
