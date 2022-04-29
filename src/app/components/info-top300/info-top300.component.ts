import { Component, OnInit } from '@angular/core';
import { TopServicesService } from 'src/app/services/top-services.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExcelService } from 'src/app/services/excel.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-info-top300',
  templateUrl: './info-top300.component.html',
  styleUrls: ['./info-top300.component.css']
})
export class InfoTop300Component implements OnInit {
 hayDatos:boolean=false
  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true,
  }
  IdMedicion:any;
  CantidadTotal:any[] = [];
  InvTotal:any[] = [];
  ProductosTotal:any[] = [];
  getTop:Subscription
  public barChartLabels:any[] = [];// = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:any = 'bar';
  public barChartLegend = true;
  public barChartData:any[] = [];




   Importados:any=[]
   TopImportados:any=[]
   searchValue: string;
   tienda:number =0
   canvas:any;
   ctx:any;
  constructor(private TopService: TopServicesService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private excelService:ExcelService) { }

  ngOnInit() {

    this.TopService.ConteoId.subscribe(conteodId=>{
      this.IdMedicion = conteodId
    })

  }

getStoreID(id){

this.tienda = id

}
  GetData(FechaDesde:any, FechaHasta:any){


    if(this.tienda===0){
      this.toastr.error('Error!', 'Debe de seleccionar una tienda',{
        timeOut: 3000,
      });
    }
    if(FechaDesde===''){
      this.toastr.error('Error!', 'Debe de seleccionar una fecha inicial',{
        timeOut: 3000,
      });
    }
    if(FechaHasta===''){
      this.toastr.error('Error!', 'Debe de seleccionar una fecha final',{
        timeOut: 3000,
      });
    }


    else{
      this.spinner.show();
      this.InvTotal = []
      this.Importados =[]
      this.CantidadTotal = [];
      this.ProductosTotal= [];
      this.getTop=this.TopService.getImportados(this.tienda, FechaDesde,FechaHasta, this.IdMedicion).subscribe(importado=>{
        this.Importados = importado

        this.spinner.hide();



          const size = 10
          this.TopImportados = this.Importados.slice(0, size)

          this.TopImportados.forEach((x: { Venta: number; CantidadSistema: number; Description: any; })=>{


            this.CantidadTotal.push(x.Venta);
            this.ProductosTotal.push(x.Description);
     

        });

      })

      this.barChartData = [
        {data: this.CantidadTotal, label:'Venta'},

      ];

   this.barChartLabels=this.ProductosTotal;
    }


    this.hayDatos =true;




  }


 reload(){
   this.getTop.unsubscribe();
  this.InvTotal = []
  this.Importados =[]
  this.CantidadTotal = [];
  this.ProductosTotal= [];
 }

 exportAsXLSX():void {
  this.excelService.exportAsExcelFile(this.Importados, 'Top 300 Importados');
}

}
