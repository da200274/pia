import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/models/korisnik';
import { FetchService } from 'src/app/services/fetch.service';
import { UpdateDataService } from 'src/app/services/update-data.service';

function incrementCharacters(str: string) {
  return str.split('').map(char => {
    let code = char.charCodeAt(0);
    let shiftedCode = code + 1;
    return String.fromCharCode(shiftedCode);
  }).join('');
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})


export class ChangePasswordComponent implements OnInit{

  constructor(private updateServis: UpdateDataService, private fetchServis: FetchService, private router: Router){}

  ngOnInit(): void {
    this.inicijalizuj();
  }

  inicijalizuj(){
    let temp = localStorage.getItem("korisnik")
    if(temp){
      this.korisnik = JSON.parse(temp)
      this.selectedOption = "znam_lozinku"
    }
    else{
      this.selectedOption = "sigurnosno_pitanje"
      this.prviDeo = true
    }
  }

  odgovori1(){
    if(this.odgovor == ""){
      this.message = "Unesite odgovor."
      return
    }
    let cipher = incrementCharacters(this.odgovor)
    if(cipher == this.korisnik.lozinka){
      this.message = ""
      this.answered = true
    }else{
      this.message = "Pogrešna stara lozinka."
    }

  }

  odgovori2(){
    if(this.odgovor == ""){
      this.message = "Unesite odgovor."
      return
    }
    else if(this.odgovor == this.korisnik.odgovor){
      this.message = ""
      this.answered = true
    }else{
      this.message = "Pogrešan odgovor."
    }
  }

  odgovori3(){
    if(this.odgovor ==""){
      this.message = "Unesite korime."
      return
    }
    this.fetchServis.user_by_korime(this.odgovor).subscribe(
      u=>{
        if(u) {
          this.korisnik = u
          this.prviDeo = false
          this.message = ""
        }
        else{
          this.message = "Ne postoji taj korisnik."
        }
      }
    )

  }

  promeni_lozinku(){
    if(this.nova_lozinka == ""){
      this.message="Unesite novu lozinku.";
      return
    }
    if(this.nova_lozinka != this.ponovljena_nova_lozinka){
      this.message="Lozinke moraju biti iste.";
      return
    }
    this.check_constraints()
    if(this.message == ""){
      this.updateServis.change_password(this.korisnik.korime, this.nova_lozinka).subscribe(
        msg=>{
          if(msg.poruka != "ok"){
            console.log(msg.poruka)
          }
          else{
            localStorage.clear()
            this.router.navigate(['login'])
          }
        }
      )
    }
  }

  check_constraints(){
    const regex = /^(?=.*[A-Z])(?=.*[a-z]{3})(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{6,10}$/;
    if(!regex.test(this.nova_lozinka)){
      this.message = "Lozinka mora da pocne slovom, ima bar jedno veliko slovo, jedan broj, 3 mala slova i jedan specijalni karakter! Max 10 min 6 karaktera."
      return;
    }
    this.message = ""
  }

  selectedOption: string = ""
  message: string = ""
  korisnik: Korisnik = new Korisnik()
  odgovor: string = ""
  answered: boolean = false;
  nova_lozinka: string = ""
  ponovljena_nova_lozinka: string = ""
  prviDeo: boolean = false
}
