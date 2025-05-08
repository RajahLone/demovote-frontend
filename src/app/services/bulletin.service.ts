import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs';

import { Environnement } from '../env';
import { ProductionChoice, ProductionVote } from '../interfaces/production';
import { Message } from '../interfaces/divers';

@Injectable({ providedIn: 'root' })

export class BulletinService
{

  private baseURL = Environnement.apiUrl + "urne";

  constructor(private httpClient: HttpClient) { }

  getRemainingChoices(id: number): Observable<Object> { return this.httpClient.get<Object>(`${this.baseURL}/count/${id}`); }

  validateChoices(id: number): Observable<Message> { return this.httpClient.get<Message>(`${this.baseURL}/validate/${id}`); }

  getChosenProductions(id: number): Observable<ProductionChoice[]> { return this.httpClient.get<ProductionChoice[]>(`${this.baseURL}/list-chosen/${id}`); }
  getLinkedProductions(id: number): Observable<ProductionChoice[]> { return this.httpClient.get<ProductionChoice[]>(`${this.baseURL}/list-linked/${id}`); }

  choisirProduction(id_cat: number, id_prod: number): Observable<Object>
  {
    let params = new HttpParams();

    params = params.append('id_cat', id_cat);
    params = params.append('id_prod', id_prod);

    return this.httpClient.get(`${this.baseURL}/choose`, { params: params });
  }

  ecarterProduction(id_cat: number, id_prod: number): Observable<Object>
  {
    let params = new HttpParams();

    params = params.append('id_cat', id_cat);
    params = params.append('id_prod', id_prod);

    return this.httpClient.get(`${this.baseURL}/discard`, { params: params });
  }

  avancerProduction(id_cat: number, id_prod: number): Observable<Object>
  {
    let params = new HttpParams();

    params = params.append('id_cat', id_cat);
    params = params.append('id_prod', id_prod);

    return this.httpClient.get(`${this.baseURL}/up`, { params: params });
  }

  reculerProduction(id_cat: number, id_prod: number): Observable<Object>
  {
    let params = new HttpParams();

    params = params.append('id_cat', id_cat);
    params = params.append('id_prod', id_prod);

    return this.httpClient.get(`${this.baseURL}/down`, { params: params });
  }

  getResultatsPDF(): Observable<HttpResponse<Blob>>
  {
    let headers = new HttpHeaders();

    headers = headers.append('Accept', 'application/pdf');

    return this.httpClient.get(`${this.baseURL}/file`, { headers: headers, observe: 'response', responseType: 'blob' });
  }

  getResultatsHTML(id: number): Observable<HttpResponse<Blob>>
  {
    let headers = new HttpHeaders();

    headers = headers.append('Accept', 'text/html');

    return this.httpClient.get(`${this.baseURL}/diapos/${id}`, { headers: headers, observe: 'response', responseType: 'blob' });
  }

  getResultats(id: number): Observable<ProductionVote[]> { return this.httpClient.get<ProductionVote[]>(`${this.baseURL}/results/${id}`); }
  getNombreVotants(id: number): Observable<Object> { return this.httpClient.get<Object>(`${this.baseURL}/count-voters/${id}`); }

}
