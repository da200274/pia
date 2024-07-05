import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-add-waiter',
  templateUrl: './add-waiter.component.html',
  styleUrls: ['./add-waiter.component.css']
})
export class AddWaiterComponent {
  
  constructor(private router: Router, private registerServis: RegisterService){}

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
            this.message = '';
          } 
          else if(fileSize > 3 * 1024 * 1024) {
            this.message = 'Dimenzije slike moraju biti veličine manje od 3MB!';
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

  registruj(){
    this.tip = "waiter"
    this.check_constraints();
    localStorage.setItem("korime", this.korime);
    if(this.message == ""){
      this.registerServis.register_user(this.korime, this.lozinka, this.pitanje, this.odgovor, this.ime, this.prezime, this.pol,
        this.adresa, this.kontakt, this.mejl, this.restoran, this.profilna, this.tip).subscribe(
          data=>{
            if(data.poruka == "ok"){
              this.send_photo();
            }
            else {
              console.log(data.poruka)
              this.message = "Neuspešna registracija";
            }
          }
        )
    }
  }

  send_photo(){
    if(this.file != null ){
      this.registerServis.file_upload(this.file).subscribe(
        data=>{
          if(data.poruka != "not ok"){
            this.update_photo(data.poruka)
          }
          else{
            this.message = "Neuspešno dodavanje slike!";
          }
        }
      )
    }
    else{
      this.update_photo("default.png")
    }
  }

  update_photo(naziv: string){
    this.registerServis.update_photo(naziv, this.korime).subscribe(
      data=>{
        if(data.poruka == "ok"){
          this.router.navigate(['profil'])
        }
        else{
          this.message = "Neuspešno ažuriranje slike!";
        }
      }
    )
  }

  check_constraints(){
    const regex = /^(?=.*[A-Z])(?=.*[a-z]{3})(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{6,10}$/;
    if(!regex.test(this.lozinka)){
      this.message = "Lozinka mora da pocne slovom, ima bar jedno veliko slovo, jedan broj, 3 mala slova i jedan specijalni karakter! Max 10 min 6 karaktera."
      return;
    }
    else if(this.lozinka != this.potvrda){
      this.message = "Lozinke se ne poklapaju!";
      return;
    }
    else if(this.korime == "" || this.lozinka == "" || this.potvrda == "" || this.mejl == "" || this.pitanje== "" || this.odgovor == ""){
      this.message = "Popunite sve podatke!"
      return;
    }
    else if(this.ime == "" || this.prezime == "" || this.pol == "" || this.adresa == "" || this.kontakt == "" || this.restoran == ""){
      this.message = "Popunite sve podatke!"
      return;
    }
    this.message = "";
  }


  image_preview: string = ""
  file: File|null = null;


  korime: string = "";
  lozinka: string = "";
  mejl: string = "";
  potvrda: string = "";
  pitanje: string = "";
  odgovor: string = "";
  ime: string = "";
  prezime: string = "";
  pol: string = "";
  adresa: string = "";
  kontakt: string = "";
  profilna: string = "";
  tip: string = "";
  restoran: string = "";

  message: string = ""
}
