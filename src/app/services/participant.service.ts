import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Environnement } from '../env';
import { Participant, ParticipantList, ParticipantShort } from '../interfaces/participant';

@Injectable({ providedIn: 'root' })

export class ParticipantService 
{

  private baseURL = Environnement.apiUrl + "participant";

  constructor(private httpClient: HttpClient) { }
  
  getListParticipant(): Observable<ParticipantList[]>{ return this.httpClient.get<Participant[]>(`${this.baseURL}/list`); }

  getOptionListParticipant(): Observable<ParticipantShort[]>{ return this.httpClient.get<ParticipantShort[]>(`${this.baseURL}/option-list`); }

  createParticipant(participant: Participant): Observable<Object>{ return this.httpClient.post(`${this.baseURL}/create`, participant); }

  getByIdParticipant(id: number): Observable<Participant>{ return this.httpClient.get<Participant>(`${this.baseURL}/form/${id}`); }

  updateParticipant(id: number, participant: Participant): Observable<Object>{ return this.httpClient.put(`${this.baseURL}/update/${id}`, participant); }

  deleteParticipant(id: number): Observable<Object>{ return this.httpClient.delete(`${this.baseURL}/delete/${id}`); }
  
}