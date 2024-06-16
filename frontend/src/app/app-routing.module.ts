import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CustomerComponent } from './components/customer/customer.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminListsComponent } from './components/admin/admin-lists/admin-lists.component';
import { AdminRequestsComponent } from './components/admin/admin-requests/admin-requests.component';
import { ProfilComponent } from './components/profil/profil.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"musterija", component:CustomerComponent},
  {path:"login_admin", component:AdminLoginComponent},
  {path:"lists_admin", component:AdminListsComponent},
  {path:"requests_admin", component:AdminRequestsComponent},
  {path:"profil", component:ProfilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
