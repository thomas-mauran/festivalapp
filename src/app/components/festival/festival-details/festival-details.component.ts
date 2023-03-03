import { Component, Input } from '@angular/core';
import { Festival } from 'src/app/models/festival';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'src/app/services/message.service';
import { ActivatedRoute } from '@angular/router';
import { FestivalsService } from 'src/app/services/festivals.service';
@Component({
  selector: 'app-festival-details',
  templateUrl: './festival-details.component.html',
})
export class FestivalDetailsComponent {
  @Input() selectedFestival!: Festival;
  @Input() create?: boolean;

  constructor(
    public mService: MessageService,
    private route: ActivatedRoute,
    public festivalService: FestivalsService
  ) {}
  festivalGroup!: FormGroup;

  // on rentre dans ce init quand on va sur la route /festivals/id 
  ngOnInit(): void {
    if (this.route.snapshot.paramMap.has('festivalId')) {
      const id = this.route.snapshot.paramMap.get('festivalId')!;
      this.festivalService.getFestival(id).subscribe((fest) => {
        this.selectedFestival = fest;
        this.updateFormFromFestival();
      });
    } else {
      this.updateFormFromFestival();
    }
  }

  // on rentre dans ce change quand on va sur la route /app 
  ngOnChanges() {
    if (this.route.snapshot.paramMap.has('festivalId')) {
      const id = this.route.snapshot.paramMap.get('festivalId')!;
      this.festivalService.getFestival(id).subscribe((fest) => {
        this.selectedFestival = fest;
        this.updateFormFromFestival();
      });
    } else {
      this.updateFormFromFestival();
    }
  }

  function() {
    this.mService?.log(
      `${this.selectedFestival.name} ${this.selectedFestival.tableprice_1} ${this.selectedFestival.tableprice_3}`
    );
    this.selectedFestival.name = this.festivalGroup.value.name;
    this.selectedFestival.tableprice_1 = this.festivalGroup.value.entrancePrice;
    this.selectedFestival.tableprice_3 = this.festivalGroup.value.roomPrice;

    this.selectedFestival.tablemax_1 = this.festivalGroup.value.tablemax_1;
    this.selectedFestival.tablemax_2 = this.festivalGroup.value.tablemax_2;
    this.selectedFestival.tablemax_3 = this.festivalGroup.value.tablemax_3;
    this.selectedFestival.sqmprice_1 = this.festivalGroup.value.sqmprice_1;
    this.selectedFestival.sqmprice_2 = this.festivalGroup.value.sqmprice_2;
    this.selectedFestival.sqmprice_3 = this.festivalGroup.value.sqmprice_3;

    this.festivalService.addUpdateFestival(this.selectedFestival)

  }

  // quand on fetch les données dans /festivals/id
  updateFormFromFestival(): void {
    this.festivalGroup = new FormGroup({
      name: new FormControl(this.selectedFestival.name),
      entrancePrice: new FormControl(this.selectedFestival.tableprice_1),
      roomPrice: new FormControl(this.selectedFestival.tableprice_3),
      
      tablemax_1: new FormControl(this.selectedFestival.tablemax_1),
      tablemax_2: new FormControl(this.selectedFestival.tablemax_2),
      tablemax_3: new FormControl(this.selectedFestival.tablemax_3),
      sqmprice_1: new FormControl(this.selectedFestival.sqmprice_1),
      sqmprice_3: new FormControl(this.selectedFestival.sqmprice_3),
      sqmprice_2: new FormControl(this.selectedFestival.sqmprice_2),

    });
  }
}
