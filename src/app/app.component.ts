import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from './user.interface';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngLab';
  public NewUser: any;
  //16bytes = 128bit key AES-128
  private DecryptKey: String = 'JaNdRgUjXn2r5u8x';
  private PasswordCrypted: String;
  private LoginCrypted: String;
  public userArry:any[] = [];
  public LoginDecrypted:String;

  constructor(private authService: AuthService) {

  }

  ngOnInit() {



  }

 public  submit = (ref: any) => {

   this.LoginCrypted = CryptoJS.AES.encrypt(ref.value.loginInput, this.DecryptKey).toString();
   this.PasswordCrypted = CryptoJS.AES.encrypt(ref.value.passwordLogin, this.DecryptKey).toString();
 /* 
  this.NewUser ={
  id:'',
  UserID: Number,
  Name: this.LoginCrypted,
  Role: this.PasswordCrypted,
  Password: String
  };

   this.postUser();*/

    this.getUsers();

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
        this.SerchforMatch(this.userArry);
      }
      );

  }



  public postUser = () => {

    this.authService.PostUser(this.NewUser).subscribe(
      (res) => {
        console.log('HTTP response', res);
      },
      (err) => {
        console.log('HTTP Error', err)
      },
      () => {
        console.log('HTTP request completed.')
       
      }
    );

  }





  public SerchforMatch = (array:User[]) =>{

    console.table(array);

    this.LoginDecrypted  = CryptoJS.AES.decrypt(this.LoginCrypted, this.DecryptKey).toString(CryptoJS.enc.Utf8);

   let obj = array.find(o => CryptoJS.AES.decrypt(o.Name, this.DecryptKey).toString(CryptoJS.enc.Utf8) ===  this.LoginDecrypted);
   
     if(obj !== undefined){
       console.log(obj);
       console.log('we found a match')

     } else {

       console.log(obj);
       console.log('no such username or password')

     }

   console.log(obj);
   //console.log(this.LoginCrypted);
    /*
    let decrypted2 = CryptoJS.AES.decrypt(array[0].Name, this.DecryptKey);
    console.log(decrypted2.toString(CryptoJS.enc.Utf8));

    let decrypted = CryptoJS.AES.decrypt(this.LoginCrypted, this.DecryptKey);
    console.log(decrypted.toString(CryptoJS.enc.Utf8));*/
   
  }




  //EC
}
