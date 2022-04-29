import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash'; 
@Pipe({
  name: 'removeDuplicatesProducts'
})
export class RemoveDuplicatesProductsPipe implements PipeTransform {
  transform(value: any): any{
    if(value!== undefined && value!== null){
        return _.uniqBy(value, 'Description');
    }
    return value;
}

}
