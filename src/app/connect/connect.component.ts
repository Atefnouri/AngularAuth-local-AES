import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit {

   //key 16octet = 128bit
  private  DecryptKey: String ='JaNdRgUjXn2r5u8x';
  public ActiveUser: any;
  public userArry:any[] = [];
  private testobjenc:string;


  constructor(private authService: AuthService , private _router: Router) { 
  }

  ngOnInit() {


   this.getUsers();

  }






  public  submit = (ref: any) => {

   this.ActiveUser ={
  id:'',
  UserID: '',
  Name: ref.value.loginInput,
  Role: '',
  Password:ref.value.passwordLogin
  };

  console.log(this.ActiveUser);

  this.simulBackend(this.ActiveUser);

  }



  public simulBackend = (User:any) => {


   let obj = this.userArry.find(o =>
    CryptoJS.AES.decrypt(o.Name, this.DecryptKey).toString(CryptoJS.enc.Utf8) ===  User.Name &&
    CryptoJS.AES.decrypt(o.Password, this.DecryptKey).toString(CryptoJS.enc.Utf8) ===  User.Password 
    );

       if(obj !== undefined){

       //prep obj
       let newObj = obj;
       newObj.Name = CryptoJS.AES.decrypt(newObj.Name, this.DecryptKey).toString(CryptoJS.enc.Utf8);
       newObj.Password = CryptoJS.AES.decrypt(newObj.Password, this.DecryptKey).toString(CryptoJS.enc.Utf8);

       this.testobjenc = CryptoJS.AES.encrypt(JSON.stringify(newObj), this.DecryptKey).toString();
       sessionStorage.setItem('id', this.testobjenc);
       console.log('we found a match');
       this._router.navigate(['/home']);

     } else {
       console.log(obj);
       console.log('no such username or password')
     }

  }






  //API
    public getUsers = () => {

    this.authService.getUsers().subscribe(
      (res) => {
        console.table(res);
        this.userArry = res;
      },
      (err) => {
        console.log('HTTP Error', err);
      },
      () => {
        console.log('HTTP request completed.');
       //this.SerchforMatch(this.userArry);
      }
      );

  }






}
