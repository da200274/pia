import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderVisitorComponent } from './components/headers/header-visitor/header-visitor.component';
import { HeaderCustomerComponent } from './components/headers/header-customer/header-customer.component'
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderWaiterComponent } from './components/headers/header-waiter/header-waiter.component';
import { HeaderAdminComponent } from './components/headers/header-admin/header-admin.component';
import { FooterComponent } from './components/footer/footer.component';
import { CustomerComponent } from './components/customer/customer.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminListsComponent } from './components/admin/admin-lists/admin-lists.component';
import { AdminRequestsComponent } from './components/admin/admin-requests/admin-requests.component';
import { ProfilComponent } from './components/profil/profil.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderVisitorComponent,
    HeaderCustomerComponent,
    LoginComponent,
    RegisterComponent,
    HeaderWaiterComponent,
    HeaderAdminComponent,
    FooterComponent,
    CustomerComponent,
    CustomerComponent,
    AdminLoginComponent,
    AdminListsComponent,
    AdminRequestsComponent,
    ProfilComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
