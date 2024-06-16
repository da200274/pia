import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-waiter',
  templateUrl: './header-waiter.component.html',
  styleUrls: ['./header-waiter.component.css']
})
export class HeaderWaiterComponent {

  constructor(private router: Router){}

  logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
