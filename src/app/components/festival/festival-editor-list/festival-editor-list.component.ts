import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Editor } from 'src/app/models/editor';
import { EditorService } from 'src/app/services/editor.service';

@Component({
  selector: 'app-festival-editor-list',
  templateUrl: './festival-editor-list.component.html',
})
export class FestivalEditorListComponent implements OnInit {
  @Input() editorList: Editor[] | null = null;
  @Output() selectedEditorId = new EventEmitter<number>();
  @Output() createEditorEmit = new EventEmitter();

  emitId(id: number) {
    this.selectedEditorId.emit(id);
  }

  create() {
    if(this.editorList){
      this.createEditorEmit.emit()
    }
  }

  delete(id: number) {
    if(this.editorList ){
      this.editorService.deleteeditor(this.editorList[id])
    }
  }

  constructor(public editorService: EditorService) {}

  ngOnInit(): void {
    if (this.editorList === null) {
      this.editorService.getAlleditors().subscribe((e) => {
        this.editorList = e;
      });
    }
  }
}
