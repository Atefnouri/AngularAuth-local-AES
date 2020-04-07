import { Component, OnInit } from '@angular/core';
/*import sha256 from 'crypto-js/sha256';
import AES from 'crypto-js/aes';
import enc from 'crypto-js';*/
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-cryptojs',
  templateUrl: './cryptojs.component.html',
  styleUrls: ['./cryptojs.component.css']
})
export class CryptojsComponent implements OnInit {

   //key 16octet = 128bit
  private  DecryptKey: String;
  public ciphertext :String ;
  constructor() { 
  }

  ngOnInit() {
    this.DecryptKey = 'JaNdRgUjXn2r5u8x';

  this.ciphertext = CryptoJS.AES.encrypt("Atef Nouri", this.DecryptKey ).toString();
  console.log(this.ciphertext);
​
/*var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");

    
    this.ciphertext = AES.encrypt('Atef Nouri', this.DecryptKey).toString();
    console.log(this.ciphertext);*/

  }


  decrypt(){

      let decrypted = CryptoJS.AES.decrypt(this.ciphertext, this.DecryptKey);

      console.log(decrypted.toString(CryptoJS.enc.Utf8));
   /* // Decrypt
    let bytes = AES.decrypt(this.ciphertext, this.DecryptKey);
    let originalText = bytes.toString();
    console.log(bytes);*/
  }

}
