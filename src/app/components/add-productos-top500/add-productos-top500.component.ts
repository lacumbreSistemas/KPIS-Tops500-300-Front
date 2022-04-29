import { Component, OnInit } from '@angular/core';
import { TopServicesService } from 'src/app/services/top-services.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-add-productos-top500',
  templateUrl: './add-productos-top500.component.html',
  styleUrls: ['./add-productos-top500.component.css']
})
export class AddProductosTop500Component implements OnInit {
  active = 'top';
  constructor(private TopService: TopServicesService) { }
  Loading: boolean = false;
  valueProducts = '';
  user:any=[];
  StoreID:number;
  ngOnInit() {
    let UserLocalStorage= JSON.parse(localStorage.getItem("Usuario")) ;
    this.user= UserLocalStorage

console.log('UserAdd', this.user)
  }
  addProducto(newsProductos: string){
    const re = /\r?\n|\r/g

    let productosArray = newsProductos.split(re);

console.log(productosArray)
  }


  AddProductoTop(producto, IsTop500,IsTop300){
    try{
    const re = /\r?\n|\r/g
    let productosArray = producto.split(re);
    this.Loading = true;
    this.TopService.SaveProductoTop500(productosArray, this.user.StoreId, IsTop500, IsTop300).subscribe(data=>{

      Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'El listado se actualizó',
      showConfirmButton: false,
      timer: 1500
})
this.Loading = false;
this.valueProducts = '';

}, error => {

  console.log(error);
  Swal.fire({
    position: 'center',
    icon: 'error',
    title: `${error.error.Message}`,
    showConfirmButton: true,

  })
  this.Loading = false;
  this.valueProducts = '';
})







  }
  catch{

  }

  }

}
