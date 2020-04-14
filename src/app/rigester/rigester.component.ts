import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {NgForm} from '@angular/forms';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-rigester',
  templateUrl: './rigester.component.html',
  styleUrls: ['./rigester.component.scss']
})
export class RigesterComponent implements OnInit {

	  public NewUser: any;
	  public myForm:NgForm;
  	  private LoginCrypted:String;
  	  private PasswordCrypted: String;
  	  //16bytes = 128bit key AES-128
 	  private DecryptKey: String = 'JaNdRgUjXn2r5u8x';


  constructor(private authService: AuthService) { }

  ngOnInit() {
  }




 public  submit = (ref: any) => {
 	this.myForm = ref;
   
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


  	console.error('password does not match');

  }





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
        console.log('HTTP request completed.');
        this.myForm.resetForm();
       
      }
    );

  }



  public CheckPasswordMatch = (val1:String, val2:String):Boolean =>{

  	if(val1 === val2){

  		return true;
  	} else {

  		return false;
  	}
  }



}
