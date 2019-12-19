import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-achitat-dialog',
  templateUrl: './achitat-dialog.component.html',
  styleUrls: ['./achitat-dialog.component.scss']
})
export class AchitatDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AchitatDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
  }

}
