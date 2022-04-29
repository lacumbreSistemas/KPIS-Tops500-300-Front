import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producto } from '../interfaces/producto.interface';


@Injectable({
  providedIn: 'root'
})
export class TopServicesService {
  User= new BehaviorSubject<any>('');
//  private AppUrl= '//localhost:53799/api/kpi/';
 //private AppUrl= 'http://localhost:53798/api/kpi/';
 private AppUrl= 'http://10.10.1.8/appTop500/api/kpi/';
  public DeptoID= new BehaviorSubject<any>('') ;
  public PasilloID= new BehaviorSubject<any>('') ;
  public ConteoId= new BehaviorSubject<any>('') ;
  Entro= new BehaviorSubject<boolean>(false);
  constructor( private http: HttpClient) {



  }

  getUser(user){

    return this.http.post(this.AppUrl+'GetUser',user)
  }

  getImportados(idStore:number, FechaDesde:any, FechaHasta:any, IdMedicion:number ){

    return this.http.get(this.AppUrl+'ObtenerImportados'+'/'+idStore+'/'+FechaDesde+'/'+FechaHasta+'/'+IdMedicion)
  }

  UpdateUser(UserID, User): Observable<any>{
    return this.http.put(this.AppUrl+'PutUser'+'/'+UserID, User)
  }


  DeleteUser(userID, State): Observable<any>{

    return this.http.put(this.AppUrl+'DeleteUser'+'/'+userID+'/'+State, State)
  }

  GetUsers(IdTienda){
    return this.http.get(this.AppUrl+'GetUsers'+'/'+IdTienda, IdTienda);
  }

  getProductosTop(IdStore,IdConteo):Promise<Array<any>>{

    return this.http.get<Array<any> >(this.AppUrl+'GetFaltantes'+'/'+IdStore+'/'+IdConteo).toPromise();
   }

  getProductosFaltantes(IdStore, IdMedicion):Promise<Array<any>>{
    return this.http.get<Array<any> >(this.AppUrl+'GetDataFaltantesDisponibles'+'/'+IdStore+'/'+IdMedicion).toPromise();
   }


   getProductosPasillo():Promise<Array<any>>{
    return this.http.get<Array<any> >(this.AppUrl+'GetProductosPasillo').toPromise();
    }

    GetDataProductosPasillos(IdTienda, idMedicion):Promise<Array<any>>{
      return this.http.get<Array<any> >(this.AppUrl+'GetDataProductosPasillo'+'/'+IdTienda +'/'+idMedicion).toPromise();
    }
    GetDataProductosConPasillos(IdTienda, IdConteo):Promise<Array<any>>{
      return this.http.get<Array<any> >(this.AppUrl+'GetDataProductosConPasillo'+'/'+IdTienda+'/'+IdConteo).toPromise();
    }




  SaveProductoFaltante(faltante){

    return this.http.post(this.AppUrl+'InsertFaltante', faltante);
   }
  SaveUserTop500(user){

    return this.http.post(this.AppUrl+'createUser', user);
   }

   SaveProductoTop500(productoTop, StoreID, IsTop500, IsTop300): Observable<any>{

    return this.http.post(this.AppUrl+'InsertProductoTop'+'/'+StoreID +'/'+IsTop500+'/'+IsTop300, productoTop);
   }


   SaveProductoPasillo(ItemId, IdPasillo, IdStore): Observable<any>{
    return this.http.post(this.AppUrl+'PostPasillo'+'/'+ItemId+'/'+IdPasillo+'/'+IdStore, IdPasillo)

  }

   UpdateProductoPasillo(ItemId, IdPasillo, IdStore): Observable<any>{
    return this.http.put(this.AppUrl+'PutPasillo'+'/'+ItemId+'/'+IdPasillo+'/'+IdStore, IdPasillo)

  }

  LogoutUser(id, User){
    return this.http.put(this.AppUrl+'PutLogin'+'/'+id+'/',User )
  }
   DeleteFaltante(id){
     return this.http.delete(this.AppUrl+'DeleteFaltante'+'/'+id)
   }

   ActualizarDisponible(id, disponible): Observable<any>{
    return this.http.put(this.AppUrl+'PutDisponible'+'/'+id, disponible)

  }

  getUserCurrent(user){
this.User.next(user);

  }

  GetIdDepartamento(id){

    this.DeptoID.next(id);
  }

  GetIdPasillo(id){

    this.PasilloID.next(id);
  }

  GetConteoId(idConteo){
    localStorage.setItem('idConteo', idConteo);
    this.ConteoId.next(idConteo);
  }

  IfIsLogged(IsLogged){
    this.Entro.next(IsLogged);

  }

}
