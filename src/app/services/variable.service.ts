import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Environnement } from '../env';
import { Variable, VariableType } from '../interfaces/variable';

@Injectable({ providedIn: 'root' })

export class VariableService
{

  private baseURL = Environnement.apiUrl + "variable";

  constructor(private httpClient: HttpClient) { }

  getListVariable(filtreType: string): Observable<Variable[]>
  {
    let params = new HttpParams();

    if (filtreType !== null) { params = params.append('type', filtreType); }

    return this.httpClient.get<Variable[]>(`${this.baseURL}/list`, { params: params });
  }

  getOptionListVariableType(): Observable<VariableType[]>{ return this.httpClient.get<VariableType[]>(`${this.baseURL}/option-list`); }

  createVariable(variable: Variable): Observable<Object>{ return this.httpClient.post(`${this.baseURL}/create`, variable); }

  getByIdVariable(id: number): Observable<Variable>{ return this.httpClient.get<Variable>(`${this.baseURL}/form/${id}`); }

  updateVariable(id: number, variable: Variable): Observable<Object>{ return this.httpClient.put(`${this.baseURL}/update/${id}`, variable); }

  deleteVariable(id: number): Observable<Object>{ return this.httpClient.delete(`${this.baseURL}/delete/${id}`); }

}
