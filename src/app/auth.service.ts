
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
    return this.http.post(this.proxy.URL +'users', user);
  }

   getUsers():Observable<any> {
     return this.http.get(this.proxy.URL +'users');
  }

    updateUser(user):Observable<any> {
     return this.http.put(this.proxy.URL +'users/'+ user.UserID,user);
  }



/*
 public updateUser(uo: any , id:number): Observable<any> {
  return this.http.put(this.proxy.URL_LOCAL +'/api/Users/' + id , uo)
  .pipe(map(reponse => reponse.json()));
}
*/




}
