import { Component, OnInit } from '@angular/core';
import { TopServicesService } from 'src/app/services/top-services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private TopServices: TopServicesService) { }

  ngOnInit(): void {
  }
  
  EnviarIdConteo(idConteo){
    this.TopServices.GetConteoId(idConteo);


  }

}
