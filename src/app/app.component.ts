import { Component } from '@angular/core';
import { GetDataService } from './get-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  val!:string;
  result!:string;
  wait = false;

  constructor(private service:GetDataService) {}

  onSearch() {
    this.result = ""
    this.service.getData().subscribe((data:any[])=>{
      this.wait = true
      for (let i = 0; i < data.length; i++) {
        if(data[i].port==this.val || data[i].dev==this.val) {
          this.result = data[i].bcuid
          this.wait = false
          break
        }
      }
    })
  }

}
