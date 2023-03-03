import { Optional } from '@angular/core';

export class Festival {
  static sqmTable = 6;
  public id?: string;
  public name!: string;
  public tablemax_1: number;
  public tableprice_1: number;
  public sqmprice_1: number;
  public tablebooked_1: number = 0;
  public sqmbooked_1: number = 0;
  public tablemax_2: number;
  public sqmprice_2: number;
  public tablemax_3: number;
  public tableprice_3: number;
  public sqmprice_3: number;
  public revenue: number = 0;
  public visitor: boolean = false;
  public get tableTotal(): number {
    return this.tablemax_1 + this.tablemax_2 + this.tablemax_3;
  }

  public constructor(
    id: string,
    @Optional() name: string,
    @Optional() tablemax_1: number,
    @Optional() tableprice_1: number,
    @Optional() sqmprice_1: number,
    @Optional() tablemax_2: number,
    @Optional() sqmprice_2: number,
    @Optional() tablemax_3: number,
    @Optional() sqmprice_3: number,
    @Optional() tableprice_3: number,
  ) {
    this.id = id;
    this.name = name;
    this.tablemax_1 = tablemax_1;
    this.tableprice_1 = tableprice_1;
    this.sqmprice_1 = (sqmprice_1 == null) ? this.tableprice_1/6 : sqmprice_1;
    this.tablemax_2 = tablemax_2;
    this.sqmprice_2 = (sqmprice_2 == null) ? this.tableprice_1/6 : sqmprice_2;
    this.tablemax_3 = tablemax_3;
    this.tableprice_3 = tableprice_3;
    this.sqmprice_3 = (sqmprice_3 == null) ? this.tableprice_1/6 : sqmprice_3;
  }
}
