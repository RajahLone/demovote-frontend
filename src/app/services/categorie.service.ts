import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Environnement } from '../env';
import { Categorie } from '../interfaces/categorie';

@Injectable({ providedIn: 'root' })

export class CategorieService
{

  private baseURL = Environnement.apiUrl + "categorie";

  constructor(private httpClient: HttpClient) { }

  getListCategorie(admin: boolean): Observable<Categorie[]>
  {
    let params = new HttpParams();

    params = params.append('admin', admin);

    return this.httpClient.get<Categorie[]>(`${this.baseURL}/list`, { params: params });
  }

  createCategorie(categorie: Categorie): Observable<Object>{ return this.httpClient.post(`${this.baseURL}/create`, categorie); }

  getByIdCategorie(id: number): Observable<Categorie>{ return this.httpClient.get<Categorie>(`${this.baseURL}/form/${id}`); }

  updateCategorie(id: number, categorie: Categorie): Observable<Object>{ return this.httpClient.put(`${this.baseURL}/update/${id}`, categorie); }

  deleteCategorie(id: number): Observable<Object>{ return this.httpClient.delete(`${this.baseURL}/delete/${id}`); }

  ouvrirScrutin(id: number): Observable<Object>{ return this.httpClient.get(`${this.baseURL}/open-poll/${id}`); }

  cloreScrutins(): Observable<Object>{ return this.httpClient.get(`${this.baseURL}/close-polls`); }

  publierVotes(): Observable<Object>{ return this.httpClient.get(`${this.baseURL}/show-results`); }

}
