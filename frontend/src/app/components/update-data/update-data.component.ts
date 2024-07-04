import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/models/korisnik';
import { ChangeDataService } from 'src/app/services/change-data.service';
import { FetchService } from 'src/app/services/fetch.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.css']
})
export class UpdateDataComponent implements OnInit{
  constructor(
     private router: Router,
     private updateServis: ChangeDataService, 
     private registerServis: RegisterService,
     private fetchServis: FetchService
    ){}
  ngOnInit(): void {
    let temp = localStorage.getItem("profil")
    if(temp) this.curr_korime = temp
    else return
    this.fetchServis.user_by_korime(temp).subscribe(
      user=>{
        if(user){
          this.k = user;
        }
      }
    )
  }

  onFileSelected(event: any): void {
    this.file = event.target.files[0] as File;

    this.file_constraints();

    this.loadImagePreview();
  }
  
  file_constraints(): void {
    console.log(this.file)
    if (this.file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = () => {
          const width = img.width;
          const height = img.height;
          const fileSize = this.file!.size;
          
          if (width >= 100 && width <= 300 && height >= 100 && height <= 300) {
            this.message = 'Dimenzije slike nisu dobre';
          } 
          else if(fileSize > 3 * 1024 * 1024) {
            this.message = 'Veličina slike moraju biti veličine manje od 3MB!';
          }
        };
      };

      reader.readAsDataURL(this.file);
    }
  }

  loadImagePreview(): void {
    if (this.file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.image_preview = e.target.result;
      };

      reader.readAsDataURL(this.file);
    }
  }

  async izmeni(i: number){
    this.data = { korime: this.curr_korime};
    switch (i) {
      case 1:
        this.data.podatak = this.korime;
        this.data.kolona = 'korime';
        break;
      case 2:
        this.data.podatak = this.imejl;
        this.data.kolona = 'imejl';
        break;
      case 3:
        this.data.podatak = this.pitanje;
        this.data.kolona = 'pitanje';
        break;
      case 4:
        this.data.podatak = this.odgovor;
        this.data.kolona = 'odgovor';
        break;
      case 5:
        this.data.podatak = this.ime;
        this.data.kolona = 'ime';
        break;
      case 6:
        this.data.podatak = this.prezime;
        this.data.kolona = 'prezime';
        break;
      case 7:
        this.data.podatak = this.adresa;
        this.data.kolona = 'adresa';
        break;
      case 8:
        this.data.podatak = this.kontakt;
        this.data.kolona = 'kontakt';
        break;
      case 9:
        this.data.podatak = this.kartica;
        this.data.kolona = 'kartica';
        break;
      case 10:
        this.data.podatak = this.radi_u;
        this.data.kolona = 'radi_u';
        break;
      case 11:
        this.data.podatak = this.pol;
        this.data.kolona = 'pol';
        break;
      case 12:
        await this.send_photo()

        this.data.podatak = this.profilna;
        this.data.kolona = 'profilna';
        break;
    }
    console.log(this.data)
    this.updateServis.change(this.data).subscribe(
      msg=>{
        if(msg.poruka == "ok"){
          if(i == 1){
            localStorage.clear()
            this.router.navigate(['login'])
          }
          this.reinicijalizuj(msg.korisnik);
        }
      }
    )
  }

  reinicijalizuj(kor: any){
    console.log(kor)
    localStorage.setItem("korisnik", JSON.stringify(kor))
    this.k = kor
    console.log(this.k)
  }

  send_photo(): Promise<void>{
    return new Promise((resolve, reject) => {
      if (this.file != null) {
        this.registerServis.file_upload(this.file).subscribe(
          data => {
            console.log(data);
            if (data.poruka != "not ok") {
              this.profilna = data.poruka;
            } else {
              this.message = "Neuspešno dodavanje slike!";
            }
            resolve();
          },
          error => {
            console.error(error);
            this.message = "Greška prilikom dodavanja slike!";
            reject(error);
          }
        );
      } else {
        this.profilna = 'default.png';
        resolve();
      }
    });
  }


  image_preview: string = ""
  file: File|null = null;


  korime: string = "";
  imejl: string = "";
  pitanje: string = "";
  odgovor: string = "";
  ime: string = "";
  prezime: string = "";
  pol: string = "";
  adresa: string = "";
  kontakt: string = "";
  profilna: string = "";
  tip: string = "";
  kartica: string = "";
  radi_u: string = ""

  data: any;
  k: Korisnik = new Korisnik()

  curr_korime: string = ""

  message: string = ""
}
