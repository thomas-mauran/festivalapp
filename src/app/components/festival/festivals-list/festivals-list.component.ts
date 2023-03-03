import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Festival } from 'src/app/models/festival';
import { FestivalsService } from 'src/app/services/festivals.service';

@Component({
  selector: 'app-festivals-list',
  templateUrl: './festivals-list.component.html',
})
export class FestivalsListComponent implements OnInit {
  @Input() festivalsList: Festival[] | null = null;
  @Output() selectedId = new EventEmitter<number>();
  @Output() createEmit = new EventEmitter();

  emitId(id: number) {
    this.selectedId.emit(id);
  }

  create() {
    if(this.festivalsList){
      this.createEmit.emit()
    }
  }

  delete(id: number) {
    if(this.festivalsList ){
      this.festivalService.deleteFestival(this.festivalsList[id])
    }
  }

  constructor(public festivalService: FestivalsService) {}

  ngOnInit(): void {
    if (this.festivalsList === null) {
      this.festivalService.getAllFestivals().subscribe((fljkhdslfkt) => {
        this.festivalsList = fljkhdslfkt;
      });
    }
  }
}
