import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CryptojsComponent } from './cryptojs/cryptojs.component';


const routes: Routes = [
{ path: 'cryptojs', component: CryptojsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
