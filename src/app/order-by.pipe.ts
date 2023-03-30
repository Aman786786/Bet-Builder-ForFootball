import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(array: any[], fields: string[]): any[] {
    if (!Array.isArray(array)) {
      return array;
    }
    return array.sort((a, b) => {
      for (let field of fields) {
        if (a[field] < b[field]) {
          return -1;
        } else if (a[field] > b[field]) {
          return 1;
        }
      }
      return 0;
    });
  }
}
