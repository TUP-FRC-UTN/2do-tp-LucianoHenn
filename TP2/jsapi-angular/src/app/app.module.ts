import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { JsmapComponent } from './jsmap/jsmap.component';
import { MappositionComponent } from './mapposition/mapposition.component';

@NgModule({
  declarations: [
    AppComponent,
    JsmapComponent,
    MappositionComponent,
  ],
  imports: [
    BrowserModule,
     // import HttpClientModule after BrowserModule.
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
