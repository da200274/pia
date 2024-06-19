import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-customer',
  templateUrl: './header-customer.component.html',
  styleUrls: ['./header-customer.component.css']
})
export class HeaderCustomerComponent implements OnInit{

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

  goto_profil(){
    this.router.navigate(['profil']);
  }

  goto_change(){
    this.router.navigate(['change_password'])
  }

  goto_restaurant(){
    this.router.navigate(['restaurants'])
  }

  goto_dostava(){
    this.router.navigate(['delivery_customer'])
  }
}
