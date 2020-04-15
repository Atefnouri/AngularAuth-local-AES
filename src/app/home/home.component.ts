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

  private aesDecryptFn(cryptedString: string): string {
    return CryptoJS.AES.decrypt(cryptedString, this.DecryptKey).toString(
      CryptoJS.enc.Utf8
    );
  }


  private aesEncryptFn(cryptedString: string): string {
    return CryptoJS.AES.encrypt(cryptedString, this.DecryptKey).toString()
  }



    //API
    public getUsers = () => {

    this.authService.getUsers().subscribe(
      (res) => {
        this.UsersArray  = res.map(o => Object.assign(
          o, 
          { Name: o.Name = this.aesDecryptFn(o.Name) },
          { Password: o.Password = this.aesDecryptFn(o.Password) },
          { Role: o.Role = this.aesDecryptFn(o.Role) }));
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

    let userSelected =  this.UsersArray.find(o => o.UserID == id);
    this.currentUser =  userSelected; 
    console.log(this.currentUser);
    this.EditisAllowed = true;
  }



   public  submit = (ref:any) => {

     if ( this.CheckPasswordMatch(ref.value.passwordLogin,ref.value.passwordLoginConfirm) ) {

       let tempUserObject:{} = {
         UserID: this.currentUser.UserID,
         Name:this.aesEncryptFn(this.currentUser.Name),
         Role : this.aesEncryptFn(this.currentUser.Role),
         Password: this.aesEncryptFn(this.currentUser.Password)
       }

       this.updateUser(tempUserObject);

     } else { console.log('password does not match') }
}


  public CheckPasswordMatch = (val1:String, val2:String):Boolean =>{

    if(val1 === val2){

      return true;
    } else {

      return false;
    }
  }


  public updateUser = (userObj:any) =>{

    this.authService.updateUser(userObj).subscribe(
    (res) => {

     console.log(res);
},
(err) => {
  console.log('HTTP Error', err);
},
() => {
  console.log('HTTP request completed.');
  this.resetFn();
 //this.SerchforMatch(this.userArry);
}
);

}





private resetFn = () =>{
  console.log('reset');
  this.currentUser = {};
}







  }









