import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTabsModule} from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from '../services/data-service';
import { AppComponent } from './app.component';
import { NgDragDropModule } from 'ng-drag-drop';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { PreviewUpdateComponent } from './preview-update/preview-update.component';

@NgModule({
  declarations: [
    AppComponent,
    PreviewUpdateComponent
  ],
  imports: [
    BrowserModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,
    MatGridListModule,
    MatListModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgDragDropModule.forRoot(),
    MatInputModule,
    MatSelectModule,
    FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
