import { Component } from '@angular/core';
import { Festival } from './models/festival';

import { Observable } from 'rxjs';
import { FestivalsService } from './services/festivals.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  festivals: Festival[] | null = null;
  selectedId: number = 0
  selectedFestival?: Festival
  isOpen: boolean = false
  createOpen: boolean =false;


  constructor(private festivalJson : FestivalsService){
  }
  ngOnInit(): void {
    this.festivalJson.getAllFestivals().subscribe((fljkhdslfkt) => {
      this.festivals = fljkhdslfkt
    });
  }

  openDetails(id: number): void {
    this.selectedId = id
    this.isOpen = true
    if (this.festivals) {
      this.selectedFestival = this.festivals[id]
    }
  }

  create(): void {
    console.log('create')
    this.createOpen = true
    
  }
}
