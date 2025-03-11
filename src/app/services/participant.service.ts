import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Participant, ParticipantShort } from '../interfaces/participant';

@Injectable({ providedIn: 'root' })

export class ParticipantService 
{

  private baseURL = "http://localhost:8080/demovote-api/v1/participant";

  constructor(private httpClient: HttpClient) { }
  
  getListParticipant(): Observable<Participant[]>{ return this.httpClient.get<Participant[]>(`${this.baseURL}/list`); }

  getOptionListParticipant(): Observable<ParticipantShort[]>{ return this.httpClient.get<ParticipantShort[]>(`${this.baseURL}/option-list`); }

  createParticipant(participant: Participant): Observable<Object>{ return this.httpClient.post(`${this.baseURL}/create`, participant); }

  getByIdParticipant(id: number): Observable<Participant>{ return this.httpClient.get<Participant>(`${this.baseURL}/form/${id}`); }

  updateParticipant(id: number, participant: Participant): Observable<Object>{ return this.httpClient.put(`${this.baseURL}/update/${id}`, participant); }

  deleteParticipant(id: number): Observable<Object>{ return this.httpClient.delete(`${this.baseURL}/delete/${id}`); }
  
}