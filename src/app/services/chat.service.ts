import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Environnement } from '../env';
import { MessageShort } from '../interfaces/chat';
import { PseudonymeList } from '../interfaces/participant';

@Injectable({ providedIn: 'root' })

export class ChatService
{

  private baseURL = Environnement.apiUrl + "chat";

  constructor(private httpClient: HttpClient) { }

  getOptionListPseudonyme(): Observable<PseudonymeList[]>{ return this.httpClient.get<PseudonymeList[]>(`${this.baseURL}/nickname-list`); }

  getNew(last: number): Observable<MessageShort[]> { return this.httpClient.get<MessageShort[]>(`${this.baseURL}/new/${last}`); }

  addNew(last: number, msg: MessageShort): Observable<MessageShort[]>{ return this.httpClient.post<MessageShort[]>(`${this.baseURL}/add/${last}`, msg); }

}
