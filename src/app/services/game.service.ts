import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { MessageService } from './message.service';
import { Game } from '../models/game';
import { map, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GameService {
  private path = '/game/';
  private gameStore: AngularFirestore;
  private gameCollection: AngularFirestoreCollection<Game>;

  constructor(
    private db: AngularFirestore,
    private messageService: MessageService
  ) {
    this.gameStore = db;
    this.gameCollection = db.collection(this.path);
  }
  doc2game(json: any): Game {
    return new Game(
      json.id,
      json.name,
      json.type,
      json.ageMin,
      json.ageMax,
      json.playerMin,
      json.playerMax,
      json.duree
    );
  }

  getAllgames(): Observable<Game[]> {
    return this.gameCollection.valueChanges({ idField: 'id' }).pipe(
      tap((doc) => {
        this.messageService.log(`doc=${JSON.stringify(doc)}`);
      }),
      map((data) => data.map((doc) => this.doc2game(doc)))
    );
  }

  addUpdategame(game: Game) {
    console.log(game)
    if (game.id == null) {
      game.id = this.gameStore.createId();
    }
    this.gameCollection.doc(game.id).set(Object.assign({}, game));
  }
  addNewgame(game: Game) {
    if (game.id == null) {
      game.id = this.gameStore.createId();
    }
    this.gameCollection
      .doc(game.id)
      .get()
      .subscribe((doc) => {
        if (!doc.exists) {
          const r = this.gameCollection
            .doc(game.id)
            .set(Object.assign({}, game));
          console.log(r);
        } // else doc exists!
      });
  }
  deletegame(game: Game) {
    this.gameStore.doc<Game>(this.path + game.id).delete();
  }
  getgame(id: String): Observable<Game> {
    var itemDoc = this.gameStore.doc<Game>(this.path + id);
    return itemDoc.valueChanges().pipe(
      map((fest) => {
        console.log(fest);
        return this.doc2game(fest);
      })
    );
  }
}
