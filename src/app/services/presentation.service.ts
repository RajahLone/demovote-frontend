import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Environnement } from '../env';
import { ProductionItem } from '../interfaces/production';

@Injectable({ providedIn: 'root' })

export class PresentationService
{

  private baseURL = Environnement.apiUrl + "presentation";

  constructor(private httpClient: HttpClient) { }

  getLinkedProductions(id: number): Observable<ProductionItem[]> { return this.httpClient.get<ProductionItem[]>(`${this.baseURL}/list-linked/${id}`); }

  getUnlinkedProductions(): Observable<ProductionItem[]> { return this.httpClient.get<ProductionItem[]>(`${this.baseURL}/list-unlinked`); }

  lierProduction(id_cat: number, id_prod: number): Observable<Object>
  {
    let params = new HttpParams();

    params = params.append('id_cat', id_cat);
    params = params.append('id_prod', id_prod);

    return this.httpClient.put(`${this.baseURL}/add`, { params: params });
  }

  retirerProduction(id_cat: number, id_prod: number): Observable<Object>
  {
    let params = new HttpParams();

    params = params.append('id_cat', id_cat);
    params = params.append('id_prod', id_prod);

    return this.httpClient.put(`${this.baseURL}/remove`, { params: params });
  }

  avancerProduction(id_cat: number, id_prod: number): Observable<Object>
  {
    let params = new HttpParams();

    params = params.append('id_cat', id_cat);
    params = params.append('id_prod', id_prod);

    return this.httpClient.put(`${this.baseURL}/forward`, { params: params });
  }

  reculerProduction(id_cat: number, id_prod: number): Observable<Object>
  {
    let params = new HttpParams();

    params = params.append('id_cat', id_cat);
    params = params.append('id_prod', id_prod);

    return this.httpClient.put(`${this.baseURL}/backward`, { params: params });
  }

}
