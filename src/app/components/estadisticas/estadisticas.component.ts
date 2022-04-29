import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  constructor() { }
  IdTienda: number;
  ngOnInit() {
    this.IdTienda =  Number(localStorage.getItem("idTienda"))
      console.log('Conteo', this.IdTienda)
  }

}
