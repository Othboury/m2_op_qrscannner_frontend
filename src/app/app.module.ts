import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { AppComponent } from './app.component';
import { ScanComponent } from './scan/scan.component';
import { AuthComponent } from './auth/auth.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { SallesComponent } from './salles/salles.component';
import { CategoriesComponent } from './categories/categories.component';
import { MaterielsComponent } from './materiels/materiels.component';
import { JournalsComponent } from './journals/journals.component';
import { HistScanComponent } from './hist-scan/hist-scan.component';
import { QRCodeModule } from 'angular2-qrcode';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

//import {PopupModule} from 'ng2-opd-popup'

const appRoutes  : Routes = [
  {path : "users" ,canActivate :[AuthGuard]  , component : UsersComponent } , 
  {path : "sign-up" , component : SignUpComponent } , 
  {path : "auth" , component : AuthComponent } , 
  {path : "" , component : AuthComponent } , 
  {path : "scan" , canActivate :[AuthGuard]  ,  component : ScanComponent },
  {path : "salles" , canActivate :[AuthGuard]  , component : SallesComponent },
  {path : "hist-scan"  , canActivate :[AuthGuard]  , component : HistScanComponent } ,
  {path : "categories" , canActivate :[AuthGuard]  , component : CategoriesComponent }, 
  {path : "materiels" , canActivate :[AuthGuard]  , component : MaterielsComponent } ,
  {path : "journals"  , canActivate :[AuthGuard]  ,  component : JournalsComponent } 
]

@NgModule({
  declarations: [
    AppComponent,
    ScanComponent,
    AuthComponent,
    SignUpComponent,
    UsersComponent,
    SallesComponent,
    CategoriesComponent,
    MaterielsComponent,
    JournalsComponent,
    HistScanComponent
  ],
  imports: [
    BrowserModule,
    ZXingScannerModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    QRCodeModule,
    DropDownListModule,
    NgbModule,
    ReactiveFormsModule
    //PopupModule.forRoot()
  ],
  providers: [HttpClientModule,AuthService , AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
