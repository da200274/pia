import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Restoran } from 'src/app/models/restoran';
import { InsertDataService } from 'src/app/services/insert-data.service';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent {

  constructor(private insertServis: InsertDataService, private router: Router){}

  file1Data: any;

  onFileSelected(event: Event, fileType: string): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const jsonData = JSON.parse(reader.result as string);
        if (fileType === 'file1') {
          this.file1Data = jsonData;
        }
        console.log(jsonData); // Check the data in console
      } catch (e) {
        console.error('Error parsing JSON:', e);
      }
    };

    reader.onerror = (error) => {
      console.error('Error reading file:', error);
    };

    reader.readAsText(file);
  }

  dodaj_restoran(){
    this.check_constraints();
    if(this.message == ""){
      const data = {
        naziv: this.naziv,
        tip: this.tip,
        adresa: this.adresa,
        kontakt: this.kontakt,
        kratak_opis: this.kratak_opis,
        mapa: this.mapa,
        raspored_stolova: this.file1Data.raspored_stolova,
        meni: this.file1Data.meni

      }

      this.insertServis.add_restaurant(data).subscribe(
        msg=>{
          if(msg.poruka == "ok"){
            this.router.navigate(['profil'])
          }
        }
      )
    }
  }

  check_constraints(){
    if(this.naziv == "" || this.tip == "" || this.adresa == "" || this.kratak_opis == "" || this.kontakt == ""){
      this.message = "Svi podaci su obavezni."
      return
    }
    else if(this.file1Data == null){
      this.message = "Unesite JSON dokument."
      return
    }
  }

  naziv: string = ""
  tip: string = ""
  adresa: string = ""
  kratak_opis: string = ""
  kontakt: string = ""
  mapa: string = ""
  message: string = ""

  restoran: Restoran = new Restoran()
}
