import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  constructor(private router: Router, private loginServis: LoginService){}

  login(){
    if(this.korime == "" || this.lozinka == ""){
      this.message = "Niste uneli sve podatke";
      return;
    }
    this.loginServis.login(this.korime, this.lozinka).subscribe(
      data=>{
        if(data == null){
          this.message = "Ne postoji takav korisnik!"
        }
        else{
          localStorage.setItem("tip", data.tip);
          localStorage.setItem("korisnik", JSON.stringify(data))
          this.router.navigate([data.tip])
        }
      }
    )
  }

  password_forgotten(){
    this.router.navigate(['change_password'])
  }

  register_page(){
    this.router.navigate(['register']);
  }

  korime: string = ""
  lozinka: string = ""
  message: string = ""
}
