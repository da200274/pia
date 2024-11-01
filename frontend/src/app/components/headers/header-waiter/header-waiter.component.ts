import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-waiter',
  templateUrl: './header-waiter.component.html',
  styleUrls: ['./header-waiter.component.css']
})
export class HeaderWaiterComponent implements OnInit{

  constructor(private router: Router){}

  ngOnInit(): void {
    let korisnik = localStorage.getItem("korisnik")
    if(korisnik){
      let temp = JSON.parse(korisnik)
      localStorage.setItem("profil", temp.korime)
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  goto_profile(){
    this.router.navigate(['profil']);
  }

  goto_change(){
    this.router.navigate(['change_password'])
  }

  goto_delivery(){
    this.router.navigate(['waiter_orders'])
  }

  goto_reservations(){
    this.router.navigate(['waiter_reservations'])
  }

  goto_my_reservations(){
    this.router.navigate(['waiter_my_reservations'])
  }

  goto_charts(){
    this.router.navigate(['charts'])
  }
}
