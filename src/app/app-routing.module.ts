import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnectComponent } from './connect/connect.component';
import { RigesterComponent } from './rigester/rigester.component';
import { HomeComponent } from './home/home.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import {AdminGuard} from './admin.guard';


const routes: Routes = [
{ path: '', component: ConnectComponent },
{ path: 'connect', component: ConnectComponent },
{ path: 'register', component: RigesterComponent },
{ path: 'home', component: HomeComponent , canActivate:[AdminGuard]},
{ path: '**', component: ErrorpageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
