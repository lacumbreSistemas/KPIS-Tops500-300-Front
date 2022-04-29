import { Statement } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TopServicesService } from 'src/app/services/top-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  EditUser: FormGroup;
  NombreUsuario = new FormControl('');
  Password = new FormControl('');
  Usuario = new FormControl('');
  user:any=[];
  userS:any=[];
  NombreTemp: any
  UserTemp: any
  RolTemp: any
  PassTemp: any
  StoreIDTemp: number;
  userId: number;
  RolId: number;
  Activo: boolean =true
  ActiveTemp:boolean;
  constructor( private topServices: TopServicesService) { }

  ngOnInit() {
    let UserLocalStorage= JSON.parse(localStorage.getItem("Usuario")) ;
    this.user= UserLocalStorage;

    this.topServices.GetUsers(this.user.StoreId).subscribe(data=>{
      this.userS = data
      console.log('Users', this.userS)
    })

    this.EditUser  = new FormGroup({
      NombreUsuario : this.NombreUsuario,
      Usuario: this.Usuario,
      Password: this.Password
    })
  }
 recibirDatosUser(user){
   this.NombreTemp=user.NombreCompleto;
   this.UserTemp=user.Usuario
   this.StoreIDTemp= user.StoreId
   this.userId= user.userID
   this.ActiveTemp=user.State;
   this.RolTemp = user.Rol
   this.PassTemp = user.Password

console.log(user);
 }
 Activar(){

  this.Activo=true

  }
 capturarRol(idRol){
this.RolId = idRol
console.log(this.RolId)

 }
 capturarStoreId(idStoreId){
this.StoreIDTemp = idStoreId
console.log(this.StoreIDTemp)

 }

updateUser(InfoUser){
  if(this.RolId==null){
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Debe elegir un rol',
      timer: 1500
     
    })
   
  }
  else {
    let User={
      NombreCompleto:InfoUser.NombreUsuario,
      Usuario: InfoUser.Usuario,
      Rol: this.RolId,
      StoreId: this.StoreIDTemp,
      State: this.Activo
   }
 
   console.log('userEditar', User)
 this.topServices.UpdateUser(this.userId, User).subscribe(data=>{
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: `Se actualizó al usuario ${this.NombreTemp}`,
    showConfirmButton: false,
    timer: 1500
  })
  this.topServices.GetUsers(this.user.StoreId).subscribe(data=>{
    this.userS = data
    console.log('Users', this.userS)
  })
 })
  }


}

EliminarUser(userId, State){
  Swal.fire({
    title: '¿Desea inactivar a este usuario?',
    showCancelButton: true,
    confirmButtonText: `Eliminar`,
    denyButtonText: `Cancelar`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      
  this.topServices.DeleteUser(userId, State).subscribe(data=>{
    this.topServices.GetUsers(this.user.StoreId).subscribe(data=>{
      this.userS = data
      console.log('Users', this.userS)
    })
    Swal.fire('Hecho! Usuario Eliminado', '', 'success')

  })
    } else if (result.isDenied) {
      Swal.fire('Cambios no efectuados', '', 'info')
    }
  })


}

}
