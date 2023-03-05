import { Component, Input, OnInit } from '@angular/core';
import { Editor } from 'src/app/models/editor';
import { Game } from 'src/app/models/game';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'src/app/services/message.service';
import { ActivatedRoute } from '@angular/router';
import { EditorService } from 'src/app/services/editor.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-editor-details',
  templateUrl: './editor-details.component.html',
})
export class EditorDetailsComponent implements OnInit{
  
  @Input() selectedEditor!: any;
  @Input() createOpenEditor?: boolean;

  gameList: Game[] = []

  constructor(
    public mService: MessageService,
    private route: ActivatedRoute,
    public editorService: EditorService,
    public gameService: GameService
  ) {}
  editorGroup!: FormGroup;

  // on rentre dans ce init quand on va sur la route /editors/id 
  ngOnInit(): void {
    if(this.createOpenEditor == false){
      if (this.route.snapshot.paramMap.has('editorId')) {
        const id = this.route.snapshot.paramMap.get('editorId')!;
        this.editorService.geteditor(id).subscribe((ed) => {
          this.selectedEditor = ed;
          this.updateFormFromeditor();
        });
      } else {
        this.updateFormFromeditor();
      }
    }else{
      this.updateFormFromeditor();
      this.selectedEditor = new Editor(null, '','', '')
    }
    this.gameService.getAllgames().subscribe((e) => {
      this.gameList = e;
    });

  
  }

  // on rentre dans ce change quand on va sur la route /app 
  ngOnChanges() {
    if(this.createOpenEditor == false){

    if (this.route.snapshot.paramMap.has('editorId')) {
      const id = this.route.snapshot.paramMap.get('editorId')!;
      this.editorService.geteditor(id).subscribe((ed) => {
        this.selectedEditor = ed;
        this.updateFormFromeditor();
      });
    } else {
      this.updateFormFromeditor();
    }
  }
  this.updateFormFromeditor();
  this.gameService.getAllgames().subscribe((e) => {
    this.gameList = e;
  });
  }

  function() {
    this.mService?.log(
      `${this.selectedEditor.name} ${this.selectedEditor.contact}`
    );
    this.selectedEditor.name = this.editorGroup.value.name;
    this.selectedEditor.contact = this.editorGroup.value.contact;
    this.selectedEditor.game = this.editorGroup.value.game;


    this.editorService.addUpdateeditor(this.selectedEditor)

  }

  functionCreate() {
    
    this.selectedEditor.name = this.editorGroup.value.name;
    this.selectedEditor.contact = this.editorGroup.value.contact;
    this.selectedEditor.game = this.editorGroup.value.game;


    this.editorService.addNeweditor(this.selectedEditor)
    console.log(this.selectedEditor)
  }

  // quand on fetch les données dans /editors/id
  updateFormFromeditor(): void {
    if(this.createOpenEditor == false){
      this.editorGroup = new FormGroup({
        name: new FormControl(this.selectedEditor.name),
        contact: new FormControl(this.selectedEditor.contact),
        game: new FormControl(this.selectedEditor.game),
      });
    }else{
      this.editorGroup = new FormGroup({
        name: new FormControl(''),
        contact: new FormControl(''),
        game: new FormControl(''),

      });
    }
  }
}
