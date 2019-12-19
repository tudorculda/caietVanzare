import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table'; 
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import {MatInputModule, MAT_DATE_LOCALE} from '@angular/material';
import {MatSelectModule} from '@angular/material/select'; 
import {MatButtonModule} from '@angular/material/button';
import { BooleanTranslatePipe } from './pipes/boolean-translate.pipe';
import { HttpClientModule } from '@angular/common/http';
import {MatTooltipModule} from '@angular/material/tooltip';
import { NewSaleDialogComponent } from './components/new-sale-dialog/new-sale-dialog.component';
import {MatDialogModule} from '@angular/material/dialog'; 
import {MatStepperModule} from '@angular/material/stepper'; 
import { FormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { AchitatDialogComponent } from './components/achitat-dialog/achitat-dialog.component'; 
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,
    BooleanTranslatePipe,
    NewSaleDialogComponent,
    DeleteDialogComponent,
    AchitatDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatTableModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatMomentDateModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule,
    HttpClientModule,
    MatDialogModule,
    MatStepperModule,
    FormsModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatRadioModule
  ],
  entryComponents: [
    NewSaleDialogComponent,
    DeleteDialogComponent,
    AchitatDialogComponent
  ],

  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
