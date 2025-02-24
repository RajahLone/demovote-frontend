import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Variable } from './variable';

@Injectable({ providedIn: 'root' })

export class VariableService 
{

  private baseURL = "http://localhost:8080/demovote-api/v1/variable";

  constructor(private httpClient: HttpClient) { }
  
  getListVariable(): Observable<Variable[]>{ return this.httpClient.get<Variable[]>(`${this.baseURL}/list`); }

  createVariable(variable: Variable): Observable<Object>{ return this.httpClient.post(`${this.baseURL}/create`, variable); }

  getByIdVariable(id: number): Observable<Variable>{ return this.httpClient.get<Variable>(`${this.baseURL}/form/${id}`); }

  updateVariable(id: number, variable: Variable): Observable<Object>{ return this.httpClient.put(`${this.baseURL}/update/${id}`, variable); }

  deleteVariable(id: number): Observable<Object>{ return this.httpClient.delete(`${this.baseURL}/delete/${id}`); }
  
}