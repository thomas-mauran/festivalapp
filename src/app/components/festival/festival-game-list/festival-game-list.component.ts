import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game } from 'src/app/models/game';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-festival-game-list',
  templateUrl: './festival-game-list.component.html',
})
export class FestivalGameListComponent implements OnInit {
  @Input() gameList: Game[] | null = null;
  @Output() selectedgameId = new EventEmitter<number>();
  @Output() createGameEmit = new EventEmitter();

  emitId(id: number) {
    this.selectedgameId.emit(id);
  }

  create() {
    if(this.gameList){
      this.createGameEmit.emit()
    }
  }

  delete(id: number) {
    if(this.gameList ){
      this.gameService.deletegame(this.gameList[id])
    }
  }

  constructor(public gameService: GameService) {}

  ngOnInit(): void {
    if (this.gameList === null) {
      this.gameService.getAllgames().subscribe((g) => {
        this.gameList = g;
      });
    }
  }
}
