import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TopServicesService } from 'src/app/services/top-services.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  GetUser: FormGroup;
  UsuarioTop:any=[];
  UserLocal:any;
  LocalUser: any;
  LocalPassword: any;
  Entro:boolean;
  Usuario = new FormControl('', [Validators.minLength(2), Validators.required]);
  Password = new FormControl('', [Validators.minLength(4), Validators.required]);
  DateNow = new Date();
  constructor(private TopServices: TopServicesService,  private router: Router) {
   
   }

  ngOnInit() {
 
    this.GetUser = new FormGroup({
    
      Usuario:this.Usuario,
      Password:this.Password,
    
    
    });
 
  }

  // let UserLocalStorage= JSON.parse(localStorage.getItem("Usuario")) ;
 
sendUser(userAll){
  try{
    let UserLogin = {
   
      User: userAll.Usuario,
      Password: userAll.Password,
      IsLogged: true
    }

    this.TopServices.getUser(UserLogin).subscribe(data=>{
      this.UsuarioTop = data;
      console.log('DatosUser', this.UsuarioTop)
      
      localStorage.setItem("idTienda",this.UsuarioTop.StoreId)

      localStorage.setItem("Usuario",JSON.stringify(this.UsuarioTop))
      let UserLocalStorage= JSON.parse(localStorage.getItem("Usuario")) ;
      this.TopServices.IfIsLogged(UserLocalStorage.IsLogged);
      this.TopServices.getUserCurrent(JSON.parse(localStorage.getItem("Usuario")))
      console.log('UserLogin', this.UsuarioTop)
      this.router.navigate(['/home'])
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `Bienvenido ${this.UsuarioTop.NombreCompleto}`,
        showConfirmButton: false,
        timer: 1500
      })

    }, error => {
      
      console.log(error);
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: `${error.error.Message}`,
              showConfirmButton: true,
             
            })
           
          }) 
  }
catch{

}
}
}
