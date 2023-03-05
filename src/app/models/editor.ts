import { Optional } from '@angular/core';

export class Editor {
  public id?: string;
  public name!: string;
  public contact!: string;
  public game!: string;

  public constructor(
    id: any,
    name: string,
    @Optional() contact: string,
    @Optional() game: string,

  ) {
    this.id = id;
    this.name = name;
    this.contact = contact;
    this.game = game;

  }
}
