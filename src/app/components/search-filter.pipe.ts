import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(productoTop: Producto[], searchValue: any): Producto[] {
    if (!productoTop || !searchValue){
    return productoTop
    }
    return productoTop.filter(producto=>producto.Description.toLowerCase().includes(searchValue.toLowerCase()


            
                          
                              
    ))


            
                          
                              
   
  }

}
