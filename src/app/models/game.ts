import { Optional } from '@angular/core';

type gameType = 'child' | 'familly' | 'game role'| 'novice'| 'expert';

export class Game {
  public id?: string;
  public name!: string;
  public type!: gameType;
  public ageMin!: number;
  public ageMax!: number;
  public playerMin!: number;
  public playerMax!: number;
  public duree!: number;

  public constructor(
    id: any,
    name: string,
    @Optional() type: gameType,
    @Optional() ageMin: number,
    @Optional() ageMax: number,
    @Optional() playerMin: number,
    @Optional() playerMax: number,
    @Optional() duree: number,
   
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.ageMin = ageMin
    this.ageMax = ageMax
    this.playerMin = playerMin
    this.playerMax = playerMax
    this.duree = duree
  }
}
