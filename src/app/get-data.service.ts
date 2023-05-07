import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  private url = 'https://raw.githubusercontent.com/03li/mockjson/main/';

  constructor(private http: HttpClient) { }

  nbOFfile():Observable<number> {
    return this.http.get<number>('https://raw.githubusercontent.com/03li/mockjson/main/Nb')
  }

  getData(file:string): Observable<any[]> {
    return this.http.get<any[]>(this.url+file);
  }

  getPass():Observable<string> {
    return this.http.get<string>('https://raw.githubusercontent.com/03li/mockjson/main/pass')
  }
  
}
