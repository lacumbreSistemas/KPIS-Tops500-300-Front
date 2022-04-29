import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
@Pipe({
  name: 'removePasillos'
})
export class RemovePasillosPipe implements PipeTransform {


  transform(value: any): any{
    if(value!== undefined && value!== null){
        return _.uniqBy(value, 'Pasillo');
    }
    return value;
}
}
