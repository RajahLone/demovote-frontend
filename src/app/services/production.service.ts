import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Environnement } from '../env';
import { Production, ProductionShort, ProductionFile } from '../interfaces/production';

@Injectable({ providedIn: 'root' })

export class ProductionService 
{

  private baseURL = Environnement.apiUrl + "production";

  constructor(private httpClient: HttpClient) { }
  
  getListProduction(): Observable<ProductionShort[]>{ return this.httpClient.get<ProductionShort[]>(`${this.baseURL}/list`); }

  getProductionFile(id: number): Observable<HttpResponse<Blob>>
  {
    let headers = new HttpHeaders();
    
    headers = headers.append('Accept', 'application/zip');

    return this.httpClient.get(`${this.baseURL}/file/${id}`, { headers: headers, observe: 'response', responseType: 'blob' }); 
  }

  createProduction(production: Production): Observable<Object>{ return this.httpClient.post(`${this.baseURL}/create`, production); }

  getByIdProduction(id: number): Observable<ProductionShort>{ return this.httpClient.get<ProductionShort>(`${this.baseURL}/form/${id}`); }

  updateProduction(id: number, production: ProductionShort): Observable<Object>{ return this.httpClient.put(`${this.baseURL}/update/${id}`, production); }

  getByIdProductionFile(id: number): Observable<ProductionFile>{ return this.httpClient.get<ProductionFile>(`${this.baseURL}/formfile/${id}`); }

  uploadProductionFile(id: number, production: ProductionFile): Observable<Object>{ return this.httpClient.put(`${this.baseURL}/upload/${id}`, production); }

  deleteProduction(id: number): Observable<Object>{ return this.httpClient.delete(`${this.baseURL}/delete/${id}`); }
  
}