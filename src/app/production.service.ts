import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Production, ProductionShort } from './production';

@Injectable({ providedIn: 'root' })

export class ProductionService 
{

  private baseURL = "http://localhost:8080/demovote-api/v1/production";

  constructor(private httpClient: HttpClient) { }
  
  getListProduction(): Observable<ProductionShort[]>{ return this.httpClient.get<ProductionShort[]>(`${this.baseURL}/list`); }

  createProduction(production: Production): Observable<Object>{ return this.httpClient.post(`${this.baseURL}/create`, production); }

  getByIdProduction(id: number): Observable<Production>{ return this.httpClient.get<Production>(`${this.baseURL}/form/${id}`); }

  updateProduction(id: number, production: Production): Observable<Object>{ return this.httpClient.put(`${this.baseURL}/update/${id}`, production); }

  deleteProduction(id: number): Observable<Object>{ return this.httpClient.delete(`${this.baseURL}/delete/${id}`); }
  
}