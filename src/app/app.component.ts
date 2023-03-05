import { Component } from '@angular/core';
import { Festival } from './models/festival';

import { FestivalsService } from './services/festivals.service';
import { Editor } from './models/editor';
import { EditorService } from 'src/app/services/editor.service';

import { Game } from './models/game';
import { GameService } from 'src/app/services/game.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'my-app';
  festivals: Festival[] | null = null;
  selectedId: number = 0
  selectedFestival?: Festival
  isOpen: boolean = false
  createOpen: boolean =false;

  editors: Editor[] | null = null;
  selectedIdEditor: number = 0
  isOpenEditor: boolean = false
  selectedEditor?: Editor
  createOpenEditor: boolean = false;

  games: Game[] | null = null;
  selectedIdGame: number = 0
  isOpenGame: boolean = false
  selectedGame?: Game
  createOpenGame: boolean = false;


  constructor(private festivalJson : FestivalsService, public editorService: EditorService, public gameService: GameService){
  }
  ngOnInit(): void {
    this.festivalJson.getAllFestivals().subscribe((f) => {
      this.festivals = f
    });

    this.editorService.getAlleditors().subscribe((e) => {
      this.editors = e
    });

    this.gameService.getAllgames().subscribe((e) => {
      this.games = e
    });
  }

  openDetails(id: number): void {
    this.selectedId = id
    this.isOpen = true
    if (this.festivals) {
      this.selectedFestival = this.festivals[id]
    }
  }

  openDetailsEditor(id: number): void {
    this.selectedIdEditor = id
    this.isOpenEditor = true
    if (this.editors) {
      this.selectedEditor = this.editors[id]
    }
  }

  openDetailsGame(id: number): void {
    this.selectedIdGame = id
    this.isOpenGame = true
    if (this.games) {
      this.selectedGame = this.games[id]
    }
  }

  create(): void {
    console.log('create')
    this.createOpen = true  
  }

  createEditor(): void {
    console.log('create')
    this.createOpenEditor = true  
  }

  createGame(): void {
    console.log('create')
    this.createOpenGame = true  
  }
}
