import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-create-file',
  templateUrl: './create-file.component.html',
  styleUrls: ['./create-file.component.css']
})
export class CreateFileComponent {
  password!:string;
  modifiedContent: string = '';
  counter: number = 0;
  entriesPerDownload: number = 20000;
  passencrypted!:string;

  crypto() {
    this.passencrypted = this.encrypt(this.password)
  }

  encrypt(text: string) {
    const textString = String(text);
    return CryptoJS.AES.encrypt(textString.trim(), this.password.trim()).toString();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {
      const fileContent: string = reader.result as string;
      this.modifiedContent = this.modifyFileContent(fileContent);
    };
  }

  modifyFileContent(fileContent: string): string {
    let modifiedContent: string = '';
    const entries: any[] = JSON.parse(fileContent);

    for (const entry of entries) {
      modifiedContent += `{ "bcuid": "${this.encrypt(entry.bcuid)}", "dev": ${entry.dev}, "port": "${this.encrypt(entry.port)}" },\n`;
      this.counter++;

      if (this.counter === this.entriesPerDownload) {
        this.downloadModifiedFile(modifiedContent);
        modifiedContent = ''; // Reset the modified content
        this.counter = 0; // Reset the counter
      }
    }

    modifiedContent = modifiedContent.trim();

    this.downloadModifiedFile(modifiedContent);
    return modifiedContent;
  }

  downloadModifiedFile(content: string) {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = 'modified_file.json';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}
