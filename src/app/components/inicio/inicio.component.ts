import { Component, OnInit } from '@angular/core';
import { TopServicesService } from 'src/app/services/top-services.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  active = 1;
  NoDepartment : boolean;
  NoPasillos :boolean;
  IdDepartamento: any
  tipoSeleccionado: any;
  ProductosTop: any = []
  ProductosPasillo: any = []
  IdConteo:number;
  constructor(private TopServices: TopServicesService) { }
  user:any=[];
  ngOnInit() {

    this.IdConteo =  Number(localStorage.getItem("idConteo"))
    this.user= JSON.parse(localStorage.getItem("Usuario")) ;

    this.TopServices.getProductosTop(this.user.StoreId, this.IdConteo).then(data => {
      this.ProductosTop = data;
      console.log(this.ProductosTop)

    })

    this.TopServices.getProductosPasillo().then(data=>{
      this.ProductosPasillo = data;
      console.log('ProductosPasillo', this.ProductosPasillo)
    })


  }


  GetIdDepartamento(ID) {
    // this.IdDepartamento = ID
    this.TopServices.GetIdDepartamento(ID);
    if(ID!=0){
      this.NoPasillos = true;
    }
    if(ID ==0) {
      this.NoPasillos = false;
    }
  }

  GetIdPasillo(ID) {
    console.log('Productos', ID)
    this.TopServices.GetIdPasillo(ID);

    if(ID!=0){
      this.NoDepartment = true;
    }
    if(ID ==0) {
      this.NoDepartment = false;
    }
  }


  GetInfo(ID) {
    this.IdDepartamento = ID

  }


}
