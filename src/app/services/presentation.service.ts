import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Environnement } from '../env';
import { ProductionShort, ProductionItem, PresentationFile } from '../interfaces/production';

@Injectable({ providedIn: 'root' })

export class PresentationService
{

  private baseURL = Environnement.apiUrl + "presentation";

  constructor(private httpClient: HttpClient) { }

  getListProduction(): Observable<ProductionShort[]>
  {
    return this.httpClient.get<ProductionShort[]>(`${this.baseURL}/list-all`);
  }

  getPresentationPDF(): Observable<HttpResponse<Blob>>
  {
    let headers = new HttpHeaders();

    headers = headers.append('Accept', 'application/pdf');

    return this.httpClient.get(`${this.baseURL}/file`, { headers: headers, observe: 'response', responseType: 'blob' });
  }

  getLinkedProductions(id: number): Observable<ProductionItem[]> { return this.httpClient.get<ProductionItem[]>(`${this.baseURL}/list-linked/${id}`); }

  getUnlinkedProductions(): Observable<ProductionItem[]> { return this.httpClient.get<ProductionItem[]>(`${this.baseURL}/list-unlinked`); }

  lierProduction(id_cat: number, id_prod: number): Observable<Object>
  {
    let params = new HttpParams();

    params = params.append('id_cat', id_cat);
    params = params.append('id_prod', id_prod);

    return this.httpClient.get(`${this.baseURL}/add`, { params: params });
  }

  retirerProduction(id_cat: number, id_prod: number): Observable<Object>
  {
    let params = new HttpParams();

    params = params.append('id_cat', id_cat);
    params = params.append('id_prod', id_prod);

    return this.httpClient.get(`${this.baseURL}/remove`, { params: params });
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

  getByIdPresentationFile(id: number): Observable<PresentationFile>{ return this.httpClient.get<PresentationFile>(`${this.baseURL}/formfile/${id}`); }

  uploadMediaFile(id: number, media: PresentationFile): Observable<Object>{ return this.httpClient.put(`${this.baseURL}/upload/${id}`, media); }

}
