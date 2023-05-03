import { Component } from '@angular/core';
import { GetDataService } from './get-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  val!:string;
  bcuid!:string;
  port!:string;
  wait = false;

  constructor(private service:GetDataService) {}

  onSearch() {
    this.bcuid = ""
    this.port = ""
    this.service.getData().subscribe((data:any[])=>{
      for (let i = 0; i < data.length; i++) {
        if(data[i].dev==this.val) {
          this.bcuid = data[i].bcuid
          this.port = data[i].port
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
