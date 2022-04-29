import { AfterViewInit, Component, PipeTransform, ViewChild, LOCALE_ID, Input, ElementRef } from '@angular/core';

import { DecimalPipe, formatDate, DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable, pipe } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { TopServicesService } from 'src/app/services/top-services.service';
import { DateTime } from 'luxon';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { Producto } from 'src/app/interfaces/producto.interface';

interface Productos {

  Description: string;

  ItemLookupCode: string;

}



@Component({
  selector: 'app-tabla-top500',
  templateUrl: './tabla-top500.component.html',
  styleUrls: ['./tabla-top500.component.css'],
  providers: [DecimalPipe, { provide: LOCALE_ID, useValue: 'es-hn' }, DatePipe]
})

export class TablaTop500Component {


  @ViewChild('SearchProducto') SearchProducto: ElementRef;
  today = Date.now().toLocaleString

  active = 1;
  Productos$: Observable<Productos[]>;
  filter = new FormControl('');
  ProductosTop: any = [];
  ProductosFaltantes: any = [];
  searchValue: string;
  HayDepto:boolean=false;
  HayPasillo:boolean=false;
  Todos:boolean=true;
  nohay: boolean;
  IdConteo: number;
  List500:boolean;
  List300:boolean;
  user:any=[];
  f = new Date();
  public loading = false;
  constructor(public pipe: DecimalPipe,
    private TopServices: TopServicesService,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private spinner: NgxSpinnerService) {
  }



  ngOnInit() {


      this.IdConteo =  Number(localStorage.getItem("idConteo"))
      console.log('Conteo', this.IdConteo)



    this.user= JSON.parse(localStorage.getItem("Usuario")) ;


    this.nohay = false;
    this.TopServices.getProductosTop(this.user.StoreId, this.IdConteo).then(data => {

      this.ProductosTop = data;



    })

    this.getProductosFaltantes();
    this.getProductosDeptoIdFaltante();
    this.getProductosDeptoID();
    //Filtro por pasillo
    this.getProductosPorPasillo();
    this.getProductosFaltantesPorPasillo();
  }

  //DepartamentoProductosFaltantes
  getProductosDeptoIdFaltante() {

    this.TopServices.DeptoID.subscribe(async dataDepto => {

      if (dataDepto == 0) {
        this.HayDepto=false;
        this.TopServices.getProductosFaltantes(this.user.StoreId, this.IdConteo).then(data => {
          this.spinner.show();
          this.ProductosFaltantes = data;

          this.spinner.hide();
        })
      }
      else {
        this.spinner.show();
        this.ProductosFaltantes = (await this.TopServices.getProductosFaltantes(this.user.StoreId, this.IdConteo)).filter((item) => item.DepartmentID === Number(dataDepto))

        this.Todos=false;
        this.HayDepto=true;
        this.spinner.hide();
      }
    });

  }

  cargarLists(){
    if(this.HayDepto==true){

      this.getProductosDeptoIdFaltante();
      this.getProductosDeptoID();

    }
    else if(this.HayPasillo==true){

      this.getProductosPorPasillo();
      this.getProductosFaltantesPorPasillo();

    }

    else if(this.Todos==true){

      this.TopServices.getProductosTop(this.user.StoreId, this.IdConteo).then(data => {

        this.ProductosTop = data;



      })
     this.getProductosFaltantes()

    }


  }
  //DepartamentoProductos
  getProductosDeptoID() {

    this.TopServices.DeptoID.subscribe(async dataDepto => {


      if (dataDepto == 0) {
        this.HayDepto=false;
        this.TopServices.getProductosTop(this.user.StoreId, this.IdConteo).then(data => {
          this.spinner.show();
          this.ProductosTop = data;
          this.spinner.hide();

        })
      }
      else {

        this.ProductosTop = (await this.TopServices.getProductosTop(this.user.StoreId, this.IdConteo)).filter((item) => item.ID === Number(dataDepto))
        this.spinner.show();
        this.HayDepto=true;
        this.Todos=false;
        this.spinner.hide();
      }

    });


  }


  getProductosFaltantes() {

    this.TopServices.getProductosFaltantes(this.user.StoreId, this.IdConteo).then(data => {
      this.spinner.show();
      this.ProductosFaltantes = data;
      this.spinner.hide();

    })

  }
  //PasillosProductosFaltantes
  getProductosPorPasillo() {

    this.TopServices.PasilloID.subscribe(async dataPasillo => {


      if (dataPasillo == 0) {
        this.spinner.show();
        this.HayPasillo=false;

        this.TopServices.getProductosTop(this.user.StoreId, this.IdConteo).then(data => {
          this.ProductosTop = data;
          this.spinner.hide();
        })
      }
      else {
        this.ProductosTop = (await this.TopServices.getProductosTop(this.user.StoreId, this.IdConteo)).filter((item) => item.PasilloId === Number(dataPasillo))
        this.spinner.show();
        this.HayPasillo=true;
        this.Todos=false;
        this.spinner.hide();
      }


    });

  }

  GetIdPasillo(ID) {

    this.TopServices.GetIdPasillo(ID);
  }
  //PasillosProductosFaltantes
  getProductosFaltantesPorPasillo() {

    this.TopServices.PasilloID.subscribe(async dataPasillo => {


      if (dataPasillo == 0) {
        this.spinner.show();
        this.HayPasillo=false;
        this.TopServices.getProductosFaltantes(this.user.StoreId, this.IdConteo).then(data => {
          this.ProductosFaltantes = data;
          this.spinner.hide();
        })
      }
      else {
        this.ProductosFaltantes = (await this.TopServices.getProductosFaltantes(this.user.StoreId, this.IdConteo)).filter((item) => item.PasilloId === Number(dataPasillo))
        this.spinner.show();
        this.HayPasillo=true;
        this.Todos=false;
        this.spinner.hide();
      }
    });


  }



  enviarAFaltante(producto) {
    console.log('conteo', this.IdConteo)
    this.spinner.show();
    if ( this.IdConteo==1){
        this.List500=true;
        this.List300=false
    }
     if( this.IdConteo==2){
      this.List500=false;
      this.List300=true

    }

    let Faltante = {
      ItemId: producto.ItemId,
      disponible: false,
      StoreId: this.user.StoreId,
      userID: this.user.userID,
      Top500: this.List500,
      Top300: this.List300
    }

    this.TopServices.SaveProductoFaltante(Faltante).subscribe(data => {
      this.toastr.success('Hecho!', `El producto ${producto.Description} se envió a faltantes`);
      this.SearchProducto.nativeElement.value = ' ';
    this.cargarLists()
    this.spinner.hide();
    });




  }


  enviarAExistente(producto) {
    this.spinner.show();
    if ( this.IdConteo==1){
      this.List500=true;
      this.List300=false
  }
   if( this.IdConteo==2){
    this.List500=false;
    this.List300=true

  }


    let Faltante = {
      ItemId: producto.ItemId,
      disponible: true,
      Fecha: producto.Fecha,
      StoreId: this.user.StoreId,
      userID: this.user.userID,
      Top500: this.List500,
      Top300: this.List300
    }

    this.TopServices.SaveProductoFaltante(Faltante).subscribe(data => {
      this.toastr.success('Hecho!', `El producto ${producto.Description} se envió a disponibles`);
      this.SearchProducto.nativeElement.value = ' ';

      this.cargarLists()

      this.spinner.hide();

    });



  }
  reset() {
    this.SearchProducto.nativeElement.value = ' ';
  }
  Eliminar(productoFaltante) {
    this.spinner.show();

    this.TopServices.DeleteFaltante(productoFaltante.id).subscribe(data => {
      this.SearchProducto.nativeElement.value = ' ';
      this.toastr.success('Hecho!', `El producto ${productoFaltante.Description} se envió a pendientes nuevamente`);
      this.cargarLists()
      this.spinner.hide();
    })


  }


  ActualizarDisponible(faltante, disponible) {
    this.spinner.show();

    let Actualizar = {
      Description: faltante.Description,
      ItemId: faltante.ItemId,
      ItemLookupCode: faltante.ItemLookupCode,
      disponible: disponible,
      id:faltante.id,
      StoreId: this.user.StoreId,
      userID: this.user.userID

    }

    this.TopServices.ActualizarDisponible(faltante.ItemId, Actualizar).subscribe(data => {
     if(Actualizar.disponible==true)
      this.toastr.success('Hecho!', 'El producto se pasó a disponibles');
      else {
        this.toastr.success('Hecho!', 'El producto se pasó a faltantes');

      }
      this.SearchProducto.nativeElement.value = ' ';
      this.cargarLists()
      this.spinner.hide();
    });

  }


}
