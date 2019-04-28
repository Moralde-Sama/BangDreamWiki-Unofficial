import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boostAttribute'
})
export class BoostAttributePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if (value === 'Power') {
      return 'assets/attribute/1.png';
    } else if (value === 'Pure') {
      return 'assets/attribute/3.png';
    } else if (value === 'Cool') {
      return 'assets/attribute/2.png';
    } else if (value === 'Happy') {
      return 'assets/attribute/4.png';
    }
  }

}
