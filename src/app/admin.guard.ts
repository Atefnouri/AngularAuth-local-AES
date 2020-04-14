import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

	constructor(private _router: Router){


	}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

  	  //key 16octet = 128bit



  	if (sessionStorage.length > 0 && sessionStorage.getItem('id')) {
   	
   	console.log('******WELCOME*******');
   	return true;

} else {
  // No items
  alert('youre not connected');
  this._router.navigate(['/connect']);
  return false;
}

  
  }
  
}
