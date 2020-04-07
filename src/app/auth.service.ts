
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.interface';
import { Proxy } from 'src/proxy.config';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public proxy:Proxy;

constructor(private  http:HttpClient) { 
  this.proxy = new Proxy();
}


  PostUser(user:User):Observable<any> {
    return this.http.post(this.proxy.URL +'Users', user);
  }

   getUsers():Observable<any> {
     return this.http.get(this.proxy.URL +'Users');
  }





}
