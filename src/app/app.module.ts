import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CryptojsComponent } from './cryptojs/cryptojs.component';
import { AuthService } from './auth.service';

@NgModule({
   declarations: [
      AppComponent,
      CryptojsComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      AppRoutingModule,
      HttpClientModule
   ],
   providers: [AuthService],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }