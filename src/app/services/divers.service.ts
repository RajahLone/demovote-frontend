import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Environnement } from '../env';
import { Message, Journees } from '../interfaces/divers';

@Injectable({ providedIn: 'root' })

export class DiversService
{

  private baseURL = Environnement.apiUrl + "divers";

  constructor(private httpClient: HttpClient) { }

  getMessage(): Observable<Message>{ return this.httpClient.get<Message>(`${this.baseURL}/welcome`); }

  getJournees(): Observable<Journees>{ return this.httpClient.get<Journees>(`${this.baseURL}/days`); }

}
