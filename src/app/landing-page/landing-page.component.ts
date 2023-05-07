import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../get-data.service';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit{
  logged:boolean = false
  val!:string;
  bcuid!:string;
  port!:string;
  wait = false;
  alowed = false
  password:string = ""

  constructor(
    private service:GetDataService,
    private cookieService: CookieService) {}
  ngOnInit(): void {
     this.password = this.cookieService.get('password');
  }

  decrypte(text: string) {
    const textString = String(text);
    return CryptoJS.AES.decrypt(textString.trim(), this.password.trim()).toString(CryptoJS.enc.Utf8);
  }
  
  onSearch() {
      this.bcuid = ""
      this.port = ""
      let notFound = true;

      this.service.nbOFfile().subscribe(nb=>{
        for(let j = 0; j < nb ; j++) {
          if(notFound) {
            this.service.getData('db'+(j+1)+'.json').subscribe((data:any[])=>{
                for (let i = 0; i < data.length; i++) {
                  if(data[i].dev==this.val) {
                    this.bcuid = this.decrypte(data[i].bcuid)
                    this.port = this.decrypte(data[i].port)
                    notFound = false;
                    break
                  }
                }
                if(this.bcuid==="") {
                  this.wait = true
                }else {
                  this.wait = false
                }
            })
          }
        }
      })
  }
  
onLogin() {
  this.service.getPass().subscribe(pass=>{
    if(this.decrypte(pass)===this.password){
      this.logged = true
      this.alowed = false
      const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30); // Set the expiration date to 30 days from now
    this.cookieService.set('password', String(this.password), expirationDate);
    }else{
      this.logged = false
      this.alowed = true
    }
  })
}
}
