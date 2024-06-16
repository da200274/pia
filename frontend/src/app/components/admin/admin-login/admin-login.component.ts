import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  constructor(private router: Router, private loginServis: LoginService){}

  login(){
    if(this.korime == "" || this.lozinka == ""){
      this.message = "Niste uneli sve podatke";
      return;
    }
    this.loginServis.login_admin(this.korime, this.lozinka).subscribe(
      data=>{
        if(data == null){
          this.message = "Ne postoji takav korisnik!"
        }
        else{
          localStorage.setItem("tip", data.tip);
          localStorage.setItem("korisnik", JSON.stringify(data))
          this.router.navigate(['lists_admin'])
        }
      }
    )
  }


  korime: string = ""
  lozinka: string = ""
  message: string = ""
}
