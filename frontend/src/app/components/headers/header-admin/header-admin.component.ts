import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent {

  constructor(private router: Router){}

  logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  show_users(){
    this.router.navigate(['lists_admin'])
  }

  show_requests(){
    this.router.navigate(['requests_admin'])
  }

  show_add_waiter(){
    this.router.navigate(['add_waiter'])
  }

  show_add_restaurant(){
    this.router.navigate(['add_restaurant'])
  }
}
