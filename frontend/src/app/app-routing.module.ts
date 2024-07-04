import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatePipe } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminListsComponent } from './components/admin/admin-lists/admin-lists.component';
import { AdminRequestsComponent } from './components/admin/admin-requests/admin-requests.component';
import { ProfilComponent } from './components/profil/profil.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { WaiterOrderComponent } from './components/waiter/waiter-order/waiter-order.component';
import { DeliveryCustomerComponent } from './components/customer/delivery-customer/delivery-customer.component';
import { AddWaiterComponent } from './components/admin/add-waiter/add-waiter.component';
import { AddRestaurantComponent } from './components/admin/add-restaurant/add-restaurant.component';
import { UpdateDataComponent } from './components/update-data/update-data.component';
import { ReservationCustomerComponent } from './components/customer/reservation-customer/reservation-customer.component';
import { ReservationsComponent } from './components/customer/reservations/reservations.component';
import { ReviewComponent } from './components/customer/review/review.component';
import { WaiterReservationsComponent } from './components/waiter/waiter-reservations/waiter-reservations.component';
import { WaiterMyReservationsComponent } from './components/waiter/waiter-my-reservations/waiter-my-reservations.component';
import { ChartsComponent } from './components/charts/charts/charts.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"login_admin", component:AdminLoginComponent},
  {path:"lists_admin", component:AdminListsComponent},
  {path:"requests_admin", component:AdminRequestsComponent},
  {path:"profil", component:ProfilComponent},
  {path:"restaurants", component:RestaurantsComponent},
  {path:"restaurant", component:RestaurantComponent},
  {path:"change_password", component:ChangePasswordComponent},
  {path:"waiter_orders", component:WaiterOrderComponent},
  {path:"delivery_customer", component:DeliveryCustomerComponent},
  {path:"add_waiter", component: AddWaiterComponent},
  {path:"add_restaurant", component:AddRestaurantComponent},
  {path:"update_data", component:UpdateDataComponent},
  {path:"reservation_customer", component:ReservationCustomerComponent},
  {path:"reservations", component:ReservationsComponent},
  {path:"review", component:ReviewComponent},
  {path:"waiter_reservations", component:WaiterReservationsComponent},
  {path:"waiter_my_reservations", component:WaiterMyReservationsComponent},
  {path:"charts", component: ChartsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [DatePipe],
  exports: [RouterModule]
})
export class AppRoutingModule { }
