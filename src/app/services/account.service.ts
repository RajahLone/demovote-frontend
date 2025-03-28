import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Environnement } from '../env';
import { User, RefreshToken } from '../interfaces/user';
import { Participant } from '../interfaces/participant';
import { Journees } from '../interfaces/divers';

@Injectable({ providedIn: 'root' })

export class AccountService
{

  private baseURLsig = Environnement.apiUrl + "sign";

  private baseURLacc = Environnement.apiUrl + "account";

  private userSubject: BehaviorSubject<User | null>;

  public user: Observable<User | null>;

  private refreshToken: RefreshToken = new RefreshToken();

  constructor(private router : Router, private httpClient: HttpClient)
  {
    this.userSubject = new BehaviorSubject(JSON.parse(sessionStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public isLogged() { if (this.userSubject.value) { return true; } return false; }
  public getUsername() { if (this.userSubject.value) { return this.userSubject.value.username; } return ""; }
  public getRole() { if (this.userSubject.value) { return this.userSubject.value.role; } return ""; }
  public getAccessToken() { if (this.userSubject.value) { return this.userSubject.value.accessToken; } return ""; }
  private getRefreshToken() { if (this.userSubject.value) { return this.userSubject.value.refreshToken; } return ""; }

  salute(): Observable<Journees>
  {
    return this.httpClient.get<Journees>(`${this.baseURLsig}/hello`);
  }
  signIn(usr: User): Observable<User>
  {
    return this.httpClient.post<User>(`${this.baseURLsig}/in`, usr).pipe(map(u => { sessionStorage.setItem('user', JSON.stringify(u)); this.userSubject.next(u); return u; }));
  }
  updateToken()
  {
    this.refreshToken.accessToken = "";
    this.refreshToken.refreshToken = this.getRefreshToken();

    return this.httpClient.post<RefreshToken>(`${this.baseURLsig}/refresh`, this.refreshToken).pipe(map(u => { if ((u != null) && (this.userSubject.value != null)) { this.userSubject.value.accessToken = u.accessToken; } }));
  }

  signOut()
  {
    this.httpClient.post<User>(`${this.baseURLsig}/out`, null);

    sessionStorage.removeItem('user');
    this.userSubject.next(null);
  }
  silentOut()
  {
    sessionStorage.removeItem('user');
    this.userSubject.next(null);

    if ((this.router.url === '/') || (this.router.url === '/home')) { window.location.reload(); } else { this.router.navigate(['/']); }
  }

  getListArrives(): Observable<User[]> { return this.httpClient.get<User[]>(`${this.baseURLsig}/list`); }

  getProfil(): Observable<Participant>{ return this.httpClient.get<Participant>(`${this.baseURLacc}/form`); }

  updateProfil(participant: Participant): Observable<Object>{ return this.httpClient.put(`${this.baseURLacc}/update`, participant); }

}
