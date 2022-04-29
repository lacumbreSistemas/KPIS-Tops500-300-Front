import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxSpinnerModule } from "ngx-spinner";
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TablaTop500Component } from './components/tabla-top500/tabla-top500.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { SearchFilterPipe } from './components/search-filter.pipe';
import { ToastrModule } from 'ngx-toastr';
import { LOCALE_ID } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RemoveduplicatesPipe } from './removeduplicates.pipe';
import { TablaPasillosComponent } from './components/tabla-pasillos/tabla-pasillos.component';
import { RemovePasillosPipe } from './components/remove-pasillos.pipe';
import { AddProductosTop500Component } from './components/add-productos-top500/add-productos-top500.component';
import { OrderByPipe } from './order-by.pipe';
import { HomeComponent } from './components/home/home.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { TableroComponent } from './components/tablero/tablero.component';
import { RemoveDuplicatesProductsPipe } from './remove-duplicates-products.pipe';
import { InfoTop300Component } from './components/info-top300/info-top300.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { ChartsModule } from 'ng2-charts';
import { ExcelService } from './services/excel.service';
@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],
  declarations: [
    AppComponent,
    TablaTop500Component,
    NavbarComponent,
    InicioComponent,
    SearchFilterPipe,
    LoginComponent,
    RegisterComponent,
    RemoveduplicatesPipe,
    TablaPasillosComponent,
    RemovePasillosPipe,
   
    AddProductosTop500Component,
   
    OrderByPipe,
   
    HomeComponent,
   
    UsuariosComponent,
   
    EstadisticasComponent,
   
    TableroComponent,
   
    RemoveDuplicatesProductsPipe,
   
    InfoTop300Component,
   

    
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    GoogleChartsModule,
    ChartsModule,
    ToastrModule.forRoot(),
    

  ],
  providers: [  {provide: LOCALE_ID, useValue: 'es-ES' },
  { provide: LocationStrategy, useClass: HashLocationStrategy }, ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
