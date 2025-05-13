import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Environnement } from '../env';
import { Participant, ParticipantList, ParticipantShort } from '../interfaces/participant';
import { Pagination } from '../interfaces/divers';

@Injectable({ providedIn: 'root' })

export class ParticipantService
{

  private baseURL = Environnement.apiUrl + "participant";

  constructor(private httpClient: HttpClient) { }

  getPagination(filtreNom: string, filtreStatut: number, filtreArrive: number, page: number): Observable<Pagination>
  {
    let params = new HttpParams();

    params = params.append('nom', filtreNom);
    params = params.append('statut', filtreStatut);
    params = params.append('arrive', filtreArrive);
    params = params.append('page', page);

    return this.httpClient.get<Pagination>(`${this.baseURL}/pagination`, { params: params });
  }
  getListParticipant(filtreNom: string, filtreStatut: number, filtreArrive: number, tri: number, page: number, size: number): Observable<ParticipantList[]>
  {
    let params = new HttpParams();

    params = params.append('nom', filtreNom);
    params = params.append('statut', filtreStatut);
    params = params.append('arrive', filtreArrive);
    params = params.append('tri', tri);
    params = params.append('page', page);
    params = params.append('size', size);

    return this.httpClient.get<Participant[]>(`${this.baseURL}/list`, { params: params });
  }

  getOptionListParticipant(): Observable<ParticipantShort[]>{ return this.httpClient.get<ParticipantShort[]>(`${this.baseURL}/option-list`); }

  createParticipant(participant: Participant): Observable<Object>{ return this.httpClient.post(`${this.baseURL}/create`, participant); }

  getByIdParticipant(id: number): Observable<Participant>{ return this.httpClient.get<Participant>(`${this.baseURL}/form/${id}`); }

  updateParticipant(id: number, participant: Participant): Observable<Object>{ return this.httpClient.put(`${this.baseURL}/update/${id}`, participant); }

  deleteParticipant(id: number): Observable<Object>{ return this.httpClient.delete(`${this.baseURL}/delete/${id}`); }

  setParticipantsArrives(ids: Array<number>): Observable<Object>{ return this.httpClient.put(`${this.baseURL}/arrived`, ids); }

}
