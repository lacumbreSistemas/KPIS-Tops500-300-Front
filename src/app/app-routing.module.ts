import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductosTop500Component } from './components/add-productos-top500/add-productos-top500.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { HomeComponent } from './components/home/home.component';
import { InfoTop300Component } from './components/info-top300/info-top300.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TablaPasillosComponent } from './components/tabla-pasillos/tabla-pasillos.component';
import { TablaTop500Component } from './components/tabla-top500/tabla-top500.component';
import { TableroComponent } from './components/tablero/tablero.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

const routes: Routes = [
  { path: 'Top500', component: TablaTop500Component},
  { path: 'inicio', component: InicioComponent},
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'tablaPasillos', component: TablaPasillosComponent},
  { path: 'addProductos', component: AddProductosTop500Component},
  { path: 'registrar', component: RegisterComponent},
  { path: 'home', component: HomeComponent},
  { path: 'usuarios', component: UsuariosComponent},
  { path: 'Estadisticas', component: EstadisticasComponent},
  { path: 'Tablero', component: TableroComponent},
  { path: 'TopAnalisis', component: InfoTop300Component}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
