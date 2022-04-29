import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TopServicesService } from 'src/app/services/top-services.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
user:any=[];
UserTemp: any=[]
UserTemp2: any=[]
isLogged: boolean= false
  constructor(private topServices: TopServicesService, private router: Router) { }

  ngOnInit() {



this.topServices.Entro.subscribe(data=>{
  this.isLogged= data
 console.log('IsLoggedNav', data)
 this.UserTemp=JSON.parse(localStorage.getItem("Usuario")) ;
 console.log('userTempNav', this.UserTemp)
})





  }

IrTopAnalisis(idMedicion:number){
  this.topServices.GetConteoId(idMedicion);
  this.router.navigate(['/TopAnalisis']);

}

  Logout(){

    let UserLogout={
      IsLogged:false,
      NombreCompleto: this.UserTemp.NombreCompleto,
      Password: this.UserTemp.Password,
      Rol: this.UserTemp.Rol,
      StoreId: this.UserTemp.StoreId,
      Usuario: this.UserTemp.Usuario,
      userID: this.UserTemp.userID
      }

      localStorage.setItem("Usuario",JSON.stringify(UserLogout))
        this.UserTemp=JSON.parse(localStorage.getItem("Usuario")) ;
        this.topServices.LogoutUser(this.UserTemp.userID, UserLogout).subscribe(data=>{
      this.topServices.IfIsLogged(this.UserTemp.IsLogged)
      localStorage.removeItem('Usuario');
      localStorage.setItem("Usuario",JSON.stringify(UserLogout))
      this.UserTemp=JSON.parse(localStorage.getItem("Usuario")) ;
    });

  }

}
