import { Component } from '@angular/core';
import { GetDataService } from './get-data.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  logged:boolean = false
  val!:string;
  bcuid!:string;
  port!:string;
  wait = false;
  alowed = false
  password:string = ""

  constructor(private service:GetDataService) {}

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
    }else{
      this.logged = false
      this.alowed = true
    }
  })
}



///////////////////////////////////////////////////////

// encrypt(text: string) {
//   const textString = String(text);
//   return CryptoJS.AES.encrypt(textString.trim(), this.password.trim()).toString();
// }

// modifiedContent: string = '';
// counter: number = 0;
// entriesPerDownload: number = 20000;

// onFileSelected(event: any) {
//   const file: File = event.target.files[0];
//   const reader: FileReader = new FileReader();
//   reader.readAsText(file);

//   reader.onload = () => {
//     const fileContent: string = reader.result as string;
//     this.modifiedContent = this.modifyFileContent(fileContent);
//   };
// }

// modifyFileContent(fileContent: string): string {
//   let modifiedContent: string = '';
//   const entries: any[] = JSON.parse(fileContent);

//   for (const entry of entries) {
//     modifiedContent += `{ "bcuid": "${this.encrypt(entry.bcuid)}", "dev": ${entry.dev}, "port": "${this.encrypt(entry.port)}" },\n`;
//     this.counter++;

//     if (this.counter === this.entriesPerDownload) {
//       this.downloadModifiedFile(modifiedContent);
//       modifiedContent = ''; // Reset the modified content
//       this.counter = 0; // Reset the counter
//     }
//   }

//   modifiedContent = modifiedContent.trim();

//   this.downloadModifiedFile(modifiedContent);
//   return modifiedContent;
// }

// downloadModifiedFile(content: string) {
//   const element = document.createElement('a');
//   const file = new Blob([content], { type: 'application/json' });
//   element.href = URL.createObjectURL(file);
//   element.download = 'modified_file.json';
//   document.body.appendChild(element);
//   element.click();
//   document.body.removeChild(element);
// }
//////////////////////////////////////////////////////////
}
