import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	 private  DecryptKey: String ='JaNdRgUjXn2r5u8x';
	 public userName:String;
   public UserDecryptedObject:any;
   public EditisAllowed:Boolean;
   public currentUser:any;
    public UsersArray = [];

  constructor(private _router: Router , private authService: AuthService ) { }

  ngOnInit() {

   /*Read and decrypt item*/
  let item = sessionStorage.getItem('id');
   this.UserDecryptedObject = JSON.parse(CryptoJS.AES.decrypt(item, this.DecryptKey).toString(CryptoJS.enc.Utf8));
   console.log(this.UserDecryptedObject);
   console.log('home');
  this.userName = this.UserDecryptedObject.Name;

  this.getUsers();
  }


  public LogOut = ():void =>{
  	console.log('logout');
  	sessionStorage.clear()
  	this._router.navigate(['/connect']);
  }



  public isItAdmin = () =>{

    if( this.UserDecryptedObject.Role === 'admin'){

      return true;
    } else {
      return false;
    }

  }




    //API
    public getUsers = () => {

    this.authService.getUsers().subscribe(
      (res) => {
        this.UsersArray  = res.map(o => Object.assign(
          o, {Name: o.Name =  CryptoJS.AES.decrypt(o.Name, this.DecryptKey).toString(CryptoJS.enc.Utf8)},
             {Password: o.Password =  CryptoJS.AES.decrypt(o.Password, this.DecryptKey).toString(CryptoJS.enc.Utf8)})
        );
        console.table(this.UsersArray);
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


  public EditUser = (id:any) =>{

    console.log(id);
    let userSelected =  this.UsersArray.find(o => o.id == id);
    this.currentUser =  userSelected; 
    console.log(this.currentUser);
    this.EditisAllowed = true;
    /* let obj = this.userArry.find(o =>
    CryptoJS.AES.decrypt(o.Name, this.DecryptKey).toString(CryptoJS.enc.Utf8) ===  User.Name &&
    CryptoJS.AES.decrypt(o.Password, this.DecryptKey).toString(CryptoJS.enc.Utf8) ===  User.Password 
    );*/

  }



   public  submit = (ref:any) => {

     //this.EditisAllowed = fa;

     if( this.CheckPasswordMatch(ref.value.passwordLogin,ref.value.passwordLoginConfirm) ){

       console.log(this.currentUser);
       this.currentUser
       //let randObj:{} = this.currentUser;
       //randObj.Name = CryptoJS.AES.encrypt(randObj.Name , this.DecryptKey).toString();
       //randObj.Password = CryptoJS.AES.encrypt(randObj.Password , this.DecryptKey).toString();

       let randObj = { 
         id: this.currentUser.id, 
         UserID: this.currentUser.UserID  ,
         Name:  CryptoJS.AES.encrypt(this.currentUser.Name , this.DecryptKey).toString(), 
         Role: this.currentUser.Role,
         Password: CryptoJS.AES.encrypt(ref.value.passwordLogin , this.DecryptKey).toString(), 
       }


         this.authService.updateUser(randObj).subscribe(
      (res) => {

           console.log(res); 
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

     

   /*this.myForm = ref;
   
   this.LoginCrypted = CryptoJS.AES.encrypt(ref.value.loginInput, this.DecryptKey).toString();
   this.PasswordCrypted = CryptoJS.AES.encrypt(ref.value.passwordLogin, this.DecryptKey).toString();

   //this.CheckPasswordMatch(ref.value.passwordLogin,ref.value.passwordLoginConfirm);

   if(this.CheckPasswordMatch(ref.value.passwordLogin,ref.value.passwordLoginConfirm)){
   console.warn('ok');  
  this.NewUser ={
  id:'',
  UserID: '',
  Name:  this.LoginCrypted,
  Role: '',
  Password: this.PasswordCrypted
  };
  this.postUser();
  } else {
    console.error('password does not match');*/


  }


  public CheckPasswordMatch = (val1:String, val2:String):Boolean =>{

    if(val1 === val2){

      return true;
    } else {

      return false;
    }
  }







  }









