import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  private url = 'https://raw.githubusercontent.com/03li/mockjson/main/db.json';

  constructor(private http: HttpClient) { }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }
  
}
