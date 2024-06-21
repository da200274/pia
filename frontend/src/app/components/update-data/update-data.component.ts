import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/models/korisnik';
import { ChangeDataService } from 'src/app/services/change-data.service';

@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.css']
})
export class UpdateDataComponent {
  constructor(private router: Router, private updateServis: ChangeDataService){}

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

  izmeni(){
   this.data = {
    ime: this.ime
   }

   this.updateServis.change('change_ime', this.data).subscribe(
    msg=>{
      if(msg.poruka == "ok"){
        this.message_success = "Uspešno promenjeno ime"
        this.reinicijalizuj();
      }
    }
   )
  }

  reinicijalizuj(){

  }


  image_preview: string = ""
  file: File|null = null;


  korime: string = "";
  mejl: string = "";
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

  message: string = ""
  message_success: string = ""
}
