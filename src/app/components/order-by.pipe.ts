import { Pipe, PipeTransform } from '@angular/core';
import sortBy from 'sort-by';
@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(Productos: object [], params?: string): object[] {
    if (Productos.length){
      return Productos.sort(sortBy(params));
    }
    return Productos;

  }

}
