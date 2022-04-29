import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from './interfaces/producto.interface';

@Pipe({
  name: 'searchProductosPasillos'
})
export class SearchProductosPasillosPipe implements PipeTransform {

  transform(productoPasillo:Producto[], searchValue: any): unknown {
    if (!productoPasillo || !searchValue){
      return productoPasillo
      }
      return productoPasillo.filter(producto=>producto.Description.toLowerCase().includes(searchValue.toLowerCase()
                                  
    ))
  }

}
