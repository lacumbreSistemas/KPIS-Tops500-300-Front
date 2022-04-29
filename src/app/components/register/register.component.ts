import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TopServicesService } from 'src/app/services/top-services.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  addUser: FormGroup;
  Nombre = new FormControl('', [Validators.minLength(2), Validators.required]);
  Usuario = new FormControl('', [Validators.minLength(2), Validators.required]);
  Password = new FormControl('', [Validators.minLength(4), Validators.required]);
  idRol: number;
  idSupermercado:number
  UserTemp: any=[]
  constructor(private TopService: TopServicesService) { }

  ngOnInit() {
    this.addUser = new FormGroup({
      Nombre:this.Nombre,
      Usuario:this.Usuario,
      Password:this.Password,
    
    
    });

    
this.TopService.Entro.subscribe(data=>{

 this.UserTemp=JSON.parse(localStorage.getItem("Usuario")) ;
 console.log('userTempNav', this.UserTemp)
})
 
  }

  GetRolId(id){
console.log('idRol',id);
this.idRol = id;

  }

  GetTiendaId(id){
console.log('Tienda',id);
this.idSupermercado = id;

  }
  CheckPass(){}
  SaveUser(user){
    try{
      let NewUser = {
        NombreCompleto: user.Nombre,
        Usuario: user.Usuario,
        Password: user.Password,
        Rol: this.idRol,
        StoreId: this.idSupermercado,
        State: true
      }
      console.log('Usuario',NewUser )
      this.TopService.SaveUserTop500(NewUser).subscribe(data=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se registró al usuario satisfactoriamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.addUser.reset();
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
