import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Festival } from 'src/app/models/festival';
import { Editor } from 'src/app/models/editor';
import { FestivalsService } from 'src/app/services/festivals.service';
import { EditorService } from 'src/app/services/editor.service';

@Component({
  selector: 'app-festivals-list',
  templateUrl: './festivals-list.component.html',
})
export class FestivalsListComponent implements OnInit {
  @Input() festivalsList: Festival[] | null = null;
  @Input() editorList: Editor[] | null = null;

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

  constructor(public festivalService: FestivalsService,public editorService: EditorService) {}

  ngOnInit(): void {
    if (this.festivalsList === null) {
      this.festivalService.getAllFestivals().subscribe((f) => {
        this.festivalsList = f;
      });
    }
    if (this.editorList === null) {
      this.editorService.getAlleditors().subscribe((e) => {
        this.editorList = e;
      });
    }
  }
}
