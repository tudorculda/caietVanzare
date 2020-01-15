import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MatDatepickerInputEvent } from '@angular/material';
import { Vanzare } from 'src/app/vanzare';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
    artizan: ''
  };
  dataFormGroup: FormGroup;
  clientFormGroup: FormGroup;
  produsFormGroup: FormGroup;
  codProdusFormGroup: FormGroup;
  pretProdusFormGroup: FormGroup;
  achitatFormGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NewSaleDialogComponent>,
    private _formBuilder: FormBuilder) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.saleDto.data = new Date();
    this.clientFormGroup = this._formBuilder.group({
      numeClientControl: ['']
    });
    this.produsFormGroup = this._formBuilder.group({
          numeProdusControl: ['', Validators.required]
    });
    this.codProdusFormGroup = this._formBuilder.group({
      codProdusControl: ['']
    });
    this.pretProdusFormGroup = this._formBuilder.group({
      pretProdusControl: ['']
    });
    this.achitatFormGroup = this._formBuilder.group({
      achitatControl: ['']
    });
    this.dataFormGroup = this._formBuilder.group({
      dataControl: ['']
    });
    


    this.clientFormGroup.valueChanges.subscribe( res => {
      this.saleDto.numeClient = res.numeClientControl;
    });
    this.produsFormGroup.valueChanges.subscribe( res => {
      this.saleDto.numeProdus = res.numeProdusControl;
    });
    this.codProdusFormGroup.valueChanges.subscribe( res => {
      this.saleDto.codProdus = res.codProdusControl;
    });
    this.pretProdusFormGroup.valueChanges.subscribe( res => {
      this.saleDto.pretProdus = res.pretProdusControl;
    });
    this.achitatFormGroup.valueChanges.subscribe( res => {
      this.saleDto.achitat = res.achitatControl;
    });
  }
  

  dateSelect(event:MatDatepickerInputEvent<Date>){
    this.saleDto.data = event.value;
  }

}
