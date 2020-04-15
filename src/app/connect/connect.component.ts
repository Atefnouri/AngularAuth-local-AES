import { Component, OnInit } from "@angular/core";
import * as CryptoJS from "crypto-js";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-connect",
  templateUrl: "./connect.component.html",
  styleUrls: ["./connect.component.css"],
})
export class ConnectComponent implements OnInit {
  //key 16octet = 128bit
  private DecryptKey: String = "JaNdRgUjXn2r5u8x";
  public ActiveUser: any;
  public userArry: any[] = [];


  constructor(private authService: AuthService, private _router: Router) {}

  ngOnInit() {
    this.getUsers();
  }

  private aesDecryptFn(cryptedString: string): string {
    return CryptoJS.AES.decrypt(cryptedString, this.DecryptKey).toString(
      CryptoJS.enc.Utf8
    );
  }



  public submit = (ref: any) => {
    let obj = this.userArry.find(
      (o) =>
        this.aesDecryptFn(o.Name) === ref.value.userLogin &&
        this.aesDecryptFn(o.Password) === ref.value.userPassword
    );

    if (obj !== undefined) {

      let decName = this.aesDecryptFn(obj.Name);
      let decRole = this.aesDecryptFn(obj.Role);
      let decPassword = this.aesDecryptFn(obj.Password);

      let decObject :{} = {
        UserID: obj.UserID,
        Name: decName,
        Role: decRole,
        Password:decPassword
      }

       // decrypt and save object to session storage  
      sessionStorage.setItem(
      'id', 
      CryptoJS.AES.encrypt(JSON.stringify(decObject), this.DecryptKey).toString()
      );
        // navigate to the home page
    this._router.navigate(['/home']);

      console.log("match found");
    } else {
      console.log("no match found");
    }

  };






  //API
  public getUsers = () => {
    this.authService.getUsers().subscribe(
      (res) => {
        console.table(res);
        this.userArry = res;
      },
      (err) => {
        console.log("HTTP Error", err);
      },
      () => {
        console.log("HTTP request completed.");
        //this.SerchforMatch(this.userArry);
      }
    );
  };

  public decryptTable = (myTab: any[]) => {
    for (var i = 0; i < myTab.length; ++i) {
      console.log(
        this.aesDecryptFn(myTab[i].Name),
        this.aesDecryptFn(myTab[i].Role),
        this.aesDecryptFn(myTab[i].Password)
      );
    }
  };
}
