import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RepositorySearchComponent } from './repository-search/repository-search.component';
import { FormsModule } from '@angular/forms';
import { CardInfoComponent } from './card-info/card-info.component';

@NgModule({
  declarations: [
    AppComponent,
    RepositorySearchComponent,
    CardInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [CardInfoComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
