import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TopServicesService } from 'src/app/services/top-services.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tabla-pasillos',
  templateUrl: './tabla-pasillos.component.html',
  styleUrls: ['./tabla-pasillos.component.css']
})
export class TablaPasillosComponent implements OnInit {
  @ViewChild('SearchProducto') SearchProducto: ElementRef;
  active = 1;
  constructor(private TopServices: TopServicesService, private toastr: ToastrService,) { }
  ProductosTop: any = []
  ProductosPasillo: any = []
  ProductosConPasillo: any = []
  searchValue: string;
  ModalProduct: boolean = false
  NombreProducto: any;
  ItemID: any;
  PasilloInfo: FormGroup;
  ProductoNombre = new FormControl('')
  Pasillo = new FormControl('')
  NombrePasillo : any;
  IDPasillo: number;
  UserTemp: any=[]
  isLogged: boolean= false
  IdConteo: number;
  ngOnInit() {
    this.IdConteo =  Number(localStorage.getItem("idConteo"))
    console.log("IdConteoPasillo", this.IdConteo)
    this.TopServices.Entro.subscribe(data=>{
      this.isLogged= data
     console.log('IsLoggedNav', data)
     this.UserTemp=JSON.parse(localStorage.getItem("Usuario")) ;
     console.log('userTempNav', this.UserTemp)
    })


    this.getProductosConPasillo();
    this.getProductosPasillo();
    this.TopServices.getProductosPasillo().then(data => {
      this.ProductosPasillo = data;

    })

    this.PasilloInfo = new FormGroup({
      ProductoNombre: this.ProductoNombre,
      Pasillo: this.Pasillo

    })

  }

  getProductosConPasillo() {

    this.TopServices.GetDataProductosConPasillos(this.UserTemp.StoreId, this.IdConteo).then(data => {
      this.ProductosConPasillo = data;


    })

  }
  getProductosPasillo() {

    this.TopServices.GetDataProductosPasillos(this.UserTemp.StoreId, this.IdConteo).then(data => {
      this.ProductosTop = data;

      console.log("ToPasillos",  this.ProductosTop )

    })

  }
  setProducto(producto) {
    this.NombreProducto = producto.Description
    this.ModalProduct = true
    this.ItemID = producto.ItemId
    this.NombrePasillo = producto.Pasillo

  }
  GuardarProductoPasillo() {
    if(this.IDPasillo==0){

      this.toastr.error('Error!', 'Debe de seleccionar un pasillo válido',{
        timeOut: 1000,
      });
    }
else{
  this.TopServices.SaveProductoPasillo(this.ItemID, this.IDPasillo,this.UserTemp.StoreId).subscribe(data => {

    this.toastr.success('Hecho!', 'Al producto se le asignó un pasillo',{
      timeOut: 1000,
    });
    this.getProductosPasillo();
  })

}

  }
  UpdateProductoPasillo() {
    if(this.IDPasillo==0)
    {
      this.toastr.error('Error!', 'Debe de seleccionar un pasillo válido',{
        timeOut: 3000,
      });
    }

    else{

      this.TopServices.UpdateProductoPasillo(this.ItemID, this.IDPasillo, this.UserTemp.StoreId).subscribe(data => {

        this.toastr.success('Hecho!', 'Al producto se le actualizó un pasillo');
        this.getProductosConPasillo();
      })
    }

  }


  CapturarIDPasillo(PasilloID) {

    this.IDPasillo = PasilloID
    console.log('IdPasillo', this.IDPasillo)
  }

}
