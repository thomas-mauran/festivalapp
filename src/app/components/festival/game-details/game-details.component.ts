import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'src/app/services/message.service';
import { ActivatedRoute } from '@angular/router';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
})
export class GameDetailsComponent implements OnInit {
  @Input() selectedGame!: any;
  @Input() createOpenGame?: boolean;

  constructor(
    public mService: MessageService,
    private route: ActivatedRoute,
    public gameService: GameService
  ) {}
  gameGroup!: FormGroup;

  // on rentre dans ce init quand on va sur la route /games/id
  ngOnInit(): void {
    if (this.createOpenGame == false) {
      if (this.route.snapshot.paramMap.has('gameId')) {
        const id = this.route.snapshot.paramMap.get('gameId')!;
        this.gameService.getgame(id).subscribe((ed) => {
          this.selectedGame = ed;
          this.updateFormFromgame();
        });
      } else {
        this.updateFormFromgame();
      }
    } else {
      this.updateFormFromgame();
      this.selectedGame = new Game(null, '', 'child', 0, 0, 0, 0, 0);
    }
  }

  // on rentre dans ce change quand on va sur la route /app
  ngOnChanges() {
    if (this.createOpenGame == false) {
      if (this.route.snapshot.paramMap.has('gameId')) {
        const id = this.route.snapshot.paramMap.get('gameId')!;
        this.gameService.getgame(id).subscribe((ed) => {
          this.selectedGame = ed;
          this.updateFormFromgame();
        });
      } else {
        this.updateFormFromgame();
      }
    }
    this.updateFormFromgame();
  }

  function() {
    this.mService?.log(
      `${this.selectedGame.name} ${this.selectedGame.contact}`
    );
    this.selectedGame.name = this.gameGroup.value.name;
    this.selectedGame.type = this.gameGroup.value.type;
    this.selectedGame.ageMin = this.gameGroup.value.ageMin;
    this.selectedGame.ageMax = this.gameGroup.value.ageMax;
    this.selectedGame.playerMin = this.gameGroup.value.playerMin;
    this.selectedGame.playerMax = this.gameGroup.value.playerMax;
    this.selectedGame.duree = this.gameGroup.value.duree;

    this.gameService.addUpdategame(this.selectedGame);
  }

  functionCreate() {
    this.selectedGame.name = this.gameGroup.value.name;
    this.selectedGame.type = this.gameGroup.value.type;
    this.selectedGame.ageMin = this.gameGroup.value.ageMin;
    this.selectedGame.ageMax = this.gameGroup.value.ageMax;
    this.selectedGame.playerMin = this.gameGroup.value.playerMin;
    this.selectedGame.playerMax = this.gameGroup.value.playerMax;
    this.selectedGame.duree = this.gameGroup.value.duree;

    this.gameService.addNewgame(this.selectedGame);
    console.log(this.selectedGame);
  }

  // quand on fetch les données dans /games/id
  updateFormFromgame(): void {
    if (this.createOpenGame == false) {
      this.gameGroup = new FormGroup({
        name: new FormControl(this.selectedGame.name),
        type: new FormControl(this.selectedGame.type),
        ageMin: new FormControl(this.selectedGame.ageMin),
        ageMax: new FormControl(this.selectedGame.ageMax),
        playerMin: new FormControl(this.selectedGame.playerMin),
        playerMax: new FormControl(this.selectedGame.playerMax),
        duree: new FormControl(this.selectedGame.duree),
      });
    } else {
      this.gameGroup = new FormGroup({
        name: new FormControl(''),
        type: new FormControl(''),
        ageMin: new FormControl(''),
        ageMax: new FormControl(''),
        playerMin: new FormControl(''),
        playerMax: new FormControl(''),
        duree: new FormControl(''),
      });
    }
  }
}
