import { Injectable } from '@angular/core';
import { Vanzare } from './vanzare';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpApiService {

  changeAchitat(id: any, value:boolean) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
     return this.http.post<Vanzare>(`${environment.apiUrl}/setAchitat/${id}`,value, httpOptions);
  }
  
  constructor(private http: HttpClient) { }

  getVanzari(){
    // now returns an Observable of Config
    return this.http.get<Vanzare[]>(`${environment.apiUrl}/getVanzari`);
  }

  saveOneSale(sale: Vanzare)
  {
    return this.http.post<Vanzare>(`${environment.apiUrl}/salveazaVanzare`,sale)
  }

  deleteSale(id: string)
  {
    return this.http.post<Vanzare>(`${environment.apiUrl}/stergeVanzarea`,id);
  }
}
