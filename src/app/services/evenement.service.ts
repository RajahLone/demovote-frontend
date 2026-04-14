import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Environnement } from '../env';
import { Evenement } from '../interfaces/evenement';

@Injectable({ providedIn: 'root' })

export class EvenementService
{

  private baseURL = Environnement.apiUrl + "evenement";

  constructor(private httpClient: HttpClient) { }

  getListEvenement(jour: string): Observable<Evenement[]>
  {
    let params = new HttpParams();

    params = params.append('jour', jour);

    return this.httpClient.get<Evenement[]>(`${this.baseURL}/list`, { params: params });
  }

  getByIdEvenement(id: number): Observable<Evenement>{ return this.httpClient.get<Evenement>(`${this.baseURL}/form/${id}`); }

  createEvenement(evenement: Evenement): Observable<Object>{ return this.httpClient.post(`${this.baseURL}/create`, evenement); }

  updateEvenement(id: number, Evenement: Evenement): Observable<Object>{ return this.httpClient.put(`${this.baseURL}/update/${id}`, Evenement); }

  deleteEvenement(id: number): Observable<Object>{ return this.httpClient.delete(`${this.baseURL}/delete/${id}`); }

}
