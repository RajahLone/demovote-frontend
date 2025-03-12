import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Environnement } from '../env';
import { Categorie } from '../interfaces/categorie';

@Injectable({ providedIn: 'root' })

export class CategorieService 
{

  private baseURL = Environnement.apiUrl + "categorie";

  constructor(private httpClient: HttpClient) { }
  
  getListCategorie(): Observable<Categorie[]>{ return this.httpClient.get<Categorie[]>(`${this.baseURL}/list`); }

  createCategorie(categorie: Categorie): Observable<Object>{ return this.httpClient.post(`${this.baseURL}/create`, categorie); }

  getByIdCategorie(id: number): Observable<Categorie>{ return this.httpClient.get<Categorie>(`${this.baseURL}/form/${id}`); }

  updateCategorie(id: number, categorie: Categorie): Observable<Object>{ return this.httpClient.put(`${this.baseURL}/update/${id}`, categorie); }

  deleteCategorie(id: number): Observable<Object>{ return this.httpClient.delete(`${this.baseURL}/delete/${id}`); }
  
}