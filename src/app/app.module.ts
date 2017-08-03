import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SearchUsersComponent } from './search-users/search-users.component';
import { SearchUsersService } from './search-users.service';
import { SalesLeadsComponent } from './sales-leads/sales-leads.component';
import { SalesLeadsService } from './sales-leads.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchUsersComponent,
    SalesLeadsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [ SearchUsersService, SalesLeadsService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
