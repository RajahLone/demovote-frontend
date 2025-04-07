import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Environnement } from '../env';
import { Webcam } from '../interfaces/webcam';

@Injectable({ providedIn: 'root' })

export class WebcamService
{

  private baseURL = Environnement.apiUrl + "webcam";

  constructor(private httpClient: HttpClient) { }

  getList(): Observable<Webcam[]> { return this.httpClient.get<Webcam[]>(`${this.baseURL}/list`); }

  updateVue(webcam: Webcam): Observable<Webcam> { return this.httpClient.post<Webcam>(`${this.baseURL}/update`, webcam); }

}
