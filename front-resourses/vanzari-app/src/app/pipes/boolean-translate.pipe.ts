import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanTranslate'
})
export class BooleanTranslatePipe implements PipeTransform {

  transform(value: boolean, ...args: any[]): string {
    return value == true ? "Da" : "Nu";
  } 

}
