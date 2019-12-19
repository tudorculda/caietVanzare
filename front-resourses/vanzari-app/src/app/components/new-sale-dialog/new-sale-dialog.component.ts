import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MatDatepickerInputEvent } from '@angular/material';
import { Vanzare } from 'src/app/vanzare';
@Component({
  selector: 'app-new-sale-dialog',
  templateUrl: './new-sale-dialog.component.html',
  styleUrls: ['./new-sale-dialog.component.scss']
})
export class NewSaleDialogComponent implements OnInit {

  saleDto: Vanzare= {
    id: null,
    data:new Date(),
    numeClient: '',
    numeProdus: '',
    codProdus: null,
    pretProdus: null,
    achitat: false,
    artizan: false
  };

  constructor(
    public dialogRef: MatDialogRef<NewSaleDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.saleDto.data = new Date();
  }
  

  dateSelect(event:MatDatepickerInputEvent<Date>){
    this.saleDto.data = event.value;
  }

}
