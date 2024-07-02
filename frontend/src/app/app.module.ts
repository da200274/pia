import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderVisitorComponent } from './components/headers/header-visitor/header-visitor.component';
import { HeaderCustomerComponent } from './components/headers/header-customer/header-customer.component'
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderWaiterComponent } from './components/headers/header-waiter/header-waiter.component';
import { HeaderAdminComponent } from './components/headers/header-admin/header-admin.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminListsComponent } from './components/admin/admin-lists/admin-lists.component';
import { AdminRequestsComponent } from './components/admin/admin-requests/admin-requests.component';
import { ProfilComponent } from './components/profil/profil.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { WaiterOrderComponent } from './components/waiter/waiter-order/waiter-order.component';
import { DeliveryCustomerComponent } from './components/customer/delivery-customer/delivery-customer.component';
import { AddWaiterComponent } from './components/admin/add-waiter/add-waiter.component';
import { AddRestaurantComponent } from './components/admin/add-restaurant/add-restaurant.component';
import { UpdateDataComponent } from './components/update-data/update-data.component';
import { ReservationCustomerComponent } from './components/customer/reservation-customer/reservation-customer.component';
import { ReservationsComponent } from './components/customer/reservations/reservations.component';
import { ReviewComponent } from './components/customer/review/review.component';
import { WaiterReservationsComponent } from './components/waiter/waiter-reservations/waiter-reservations.component';

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
    AdminLoginComponent,
    AdminListsComponent,
    AdminRequestsComponent,
    ProfilComponent,
    ChangePasswordComponent,
    RestaurantsComponent,
    RestaurantComponent,
    WaiterOrderComponent,
    DeliveryCustomerComponent,
    AddWaiterComponent,
    AddRestaurantComponent,
    UpdateDataComponent,
    ReservationCustomerComponent,
    ReservationsComponent,
    ReviewComponent,
    WaiterReservationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
