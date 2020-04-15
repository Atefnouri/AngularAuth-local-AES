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
    //16bytes = 128bit key AES-128
 	  private DecryptKey: String = 'JaNdRgUjXn2r5u8x';
   
   constructor(private authService: AuthService) { }

  ngOnInit() {
  }



// Encrypt and call the post fucntion
 public  submit = (ref: any) => {
 	this.myForm = ref;

   //check if password are identical
   if(this.CheckPasswordMatch(ref.value.userPassword,ref.value.userPasswordConfirm))
   {

  this.NewUser = {
  Name:  CryptoJS.AES.encrypt(ref.value.userLogin, this.DecryptKey).toString(),
  Role:  CryptoJS.AES.encrypt(ref.value.userRole, this.DecryptKey).toString(),
  Password: CryptoJS.AES.encrypt(ref.value.userPassword, this.DecryptKey).toString()
  };
  this.postUser(this.NewUser);
  } else {
  	console.error('⛔','password does not match');
  }
  }



//API post new user object

public postUser = (newUser:any) => {

    this.authService.PostUser(newUser).subscribe(
      (res) => {
        console.log('HTTP response', res);
      },
      (err) => {
        console.log('HTTP Error', err)
      },
      () => {
        console.log('HTTP request completed.');
        console.info('✅',' successuful operation');
        this.myForm.resetForm();
       
      }
    );

  }


// check if twoo strings are matching
  public CheckPasswordMatch = (val1:String, val2:String):Boolean =>{

  	if(val1 === val2){

  		return true;
  	} else {

  		return false;
  	}
  }



}
