import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  {path:"add_restaurant", component:AddRestaurantComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
