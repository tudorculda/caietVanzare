import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent, MatSlideToggleChange, MatTable, MatRadioChange } from '@angular/material';
import { Vanzare, Filtru, FilterType } from './vanzare';
import { HttpApiService } from './http-api.service';
import { NewSaleDialogComponent } from './components/new-sale-dialog/new-sale-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { AchitatDialogComponent } from './components/achitat-dialog/achitat-dialog.component';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  dataSource: Vanzare[] = [];
  filteredValues: Vanzare[] = [];
  displayedColumns: string[] = [];
  title = 'vanzari-app';
  filterValid = false;
  filterLabels: {value:number,viewValue:string}[] = [
    { value: 1, viewValue: "Data de început"},
    { value: 2, viewValue: "Data de sfărșit"},
    { value: 3, viewValue: "Nume client"},
    { value: 4, viewValue: "Denumire produs"},
    { value: 5, viewValue: "Cod produs"},
    { value: 6, viewValue: "Pret mai mare"},
    { value: 7, viewValue: "Pret mai mic"},
    { value: 8, viewValue: "Achitat"},
    { value: 9, viewValue: "Artizan"},


  ]
filtreMap: Map<FilterType, Filtru> = new Map();
filtru: Filtru;
selectedFilter: any;


  constructor(private httpService:HttpApiService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar){}

  ngOnInit() {
    this.getAllSales();
    this.displayedColumns = ['data', 'numeClient', 'numeProdus', 'codProdus', 'pretProdus', 'achitat','artizan', 'deleteme'];
   }  


  private getAllSales() {
    this.httpService.getVanzari().subscribe((data: Vanzare[]) => {
      data.forEach(el => el.data = new Date(el.data));
      this.dataSource = data; 
      this.filterTheValues();      
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewSaleDialogComponent, {
      width: '80%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.httpService.saveOneSale(result).subscribe(result=>{
          this._snackBar.open("Vânzare", "Salvată", {
            duration: 2000,
          });
          this.getAllSales();
        });
      }
      
    });
  }

  changeAchitat(id){
    const dialogDelRef = this.dialog.open(AchitatDialogComponent, {
      width: '40%',
      data: {price:this.dataSource.find(el => el.id == id).pretProdus}
    });

    dialogDelRef.afterClosed().subscribe(result => {
      console.log("dialog result ", result);
      if(result != undefined){
        this.httpService.changeAchitat(id, result).subscribe(result=>{
          this._snackBar.open("Vânzare", "Modificată", {
            duration: 2000,
          });
          this.getAllSales();
        });
      }
      
    });   
  }

  deleteSale(id){
    const dialogDelRef = this.dialog.open(DeleteDialogComponent, {
      width: '40%',
      data: {price:this.dataSource.find(el => el.id == id).pretProdus}
    });
    dialogDelRef.afterClosed().subscribe(result => {
      if(result){
        this.httpService.deleteSale(id).subscribe(result=>{
          this._snackBar.open("Vânzare", "Ștearsă", {
            duration: 2000,
          });
          this.getAllSales();
        });
      }
      
    });
    
  }

  getTotalCost(){
    return this.filteredValues.filter(t => t.achitat).map(t => t.pretProdus).reduce((acc, value) => acc + value, 0);
  }

  newFilter(){
    this.filterValid = false;
  }
  dateSelect(filterType: string, event: MatDatepickerInputEvent<Date> ){
    this.filterValid = true;
    let dataCast:String = moment(event.value).format('DD/MM/YYYY');
    if( filterType == 'start'){
      this.filtru = { tip: FilterType.DUPA,
                     mesaj:`După ${dataCast}`,
                      filtreaza: function(dataSource:Vanzare[]){
                        return dataSource.filter( el => el.data >= event.value);
                      }
                    }
    }
    if( filterType == 'end'){
      this.filtru = { tip:FilterType.INAINTE,
                    mesaj:`Înainte ${dataCast}`,
                    filtreaza: function(dataSource:Vanzare[]){
                      return dataSource.filter( el => el.data <= event.value);
                    }
                  }
    }
  }

  textFilter(tip: string, event:any){
    this.filterValid = event.target.value.length > 0 ? true : false;
    if (!this.filterValid){
      return;
    }
    if( tip == 'nume'){
      this.filtru = { tip:FilterType.NUME_CLIENT,
                    mesaj:`Nume=${event.target.value}`,
                    filtreaza: function(dataSource:Vanzare[]){
                      return dataSource.filter( el => el.numeClient.toLowerCase().includes(event.target.value.toLowerCase()));
                    }
                  }
    }

    if( tip == 'produs'){
      this.filtru = { tip:FilterType.DENUMIRE_PRODUS,
                    mesaj:`Produs=${event.target.value}`,
                    filtreaza: function(dataSource:Vanzare[]){
                      return dataSource.filter( el => el.numeProdus.toLowerCase().includes(event.target.value.toLowerCase()));
                    }
                  }
    }

    if( tip == 'cod'){
      this.filtru = { tip:FilterType.COD_PRODUS,
                    mesaj:`Cod=${event.target.value}`,
                    filtreaza: function(dataSource:Vanzare[]){
                      return dataSource.filter( el => el.codProdus.toString().toLowerCase().includes(event.target.value.toLowerCase()));
                    }
                  }
    }
    if( tip == 'pretMaiMare'){
      this.filtru = { tip:FilterType.PRET_MAI_MARE,
                    mesaj:`PREȚ>${event.target.value}`,
                    filtreaza: function(dataSource:Vanzare[]){
                      return dataSource.filter( el => el.pretProdus>=event.target.value );
                    }
                  }
    }

    if( tip == 'pretMaiMic'){
      this.filtru = { tip:FilterType.PRET_MAI_MARE,
                    mesaj:`PREȚ<${event.target.value}`,
                    filtreaza: function(dataSource:Vanzare[]){
                      return dataSource.filter( el => el.pretProdus<=event.target.value );
                    }
                  }
    }
    if( tip == 'artizan'){
      this.filtru = { tip:FilterType.ARTIZAN,
                    mesaj:'Artizan=' + event.target.value,
                    filtreaza: function(dataSource:Vanzare[]){
                      return dataSource.filter( 
                        el => el.artizan.toString().toLowerCase().includes(event.target.value.toLowerCase()) );
                    }
                  }
    }
  }
  booleanFilter(tip:string, value:MatRadioChange){
    this.filterValid = true;
    let checked:boolean = value.value == 'true';
    if( tip == 'achitat'){
      this.filtru = { tip:FilterType.ACHITAT,
                    mesaj:'Achitat=' + (checked? 'Da': 'Nu'),
                    filtreaza: function(dataSource:Vanzare[]){
                      return dataSource.filter( el => el.achitat==checked );
                    }
                  }
    }   
  }
  clearFiltersValue(){ 
    this.filterValid = false;
    this.selectedFilter = null;

   }

  addFilter(){
    this.filtreMap.set(this.filtru.tip, this.filtru);
    this.filterTheValues();
    this.clearFiltersValue();
  }
  filterTheValues(){
    this.filteredValues = this.dataSource;
    this.filtreMap.forEach(filtru => this.filteredValues = filtru.filtreaza(this.filteredValues));
  }
  removeFilter(tip: FilterType ){
    this.filtreMap.delete(tip);
    this.filterTheValues();
  }

  export2File(){
    let csvContent = "data:text/csv;charset=utf-8,";
    
    let row = this.displayedColumns.slice(0, this.displayedColumns.length-1).join(';');
    csvContent += row + "\r\n";
    this.filteredValues.forEach( vanzare => {
        csvContent += vanzare.data.toLocaleDateString("en-GB") + ';'
        + vanzare.numeClient+ ';'
        + vanzare.numeProdus+ ';'
        + vanzare.codProdus+ ';'
        + vanzare.pretProdus+ ';'
        + (vanzare.achitat? 'Da':'Nu')+ ';'
        + (vanzare.artizan? 'Da':'Nu')+"\r\n";
    });
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "raport-vanzari-" + (new Date()).toLocaleDateString("en-GB") + ".csv");
    document.body.appendChild(link); // Required for FF
    
    link.click(); // This will download the data file named "my_data.csv".
  }
}
