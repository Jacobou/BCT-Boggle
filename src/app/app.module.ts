import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {WordListService} from "./services/word-list.service";
import {HttpClientModule} from "@angular/common/http";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { TimeUpModalComponent } from './components/time-up-modal/time-up-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    TimeUpModalComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        NgbModule
    ],
  providers: [WordListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
