import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Environnement } from '../env';
import { User } from '../interfaces/user';
import { Participant } from '../interfaces/participant';

@Injectable({ providedIn: 'root' })

export class AccountService 
{

  private baseURLsig = Environnement.apiUrl + "sign";
  
  private baseURLacc = Environnement.apiUrl + "account";

  private userSubject: BehaviorSubject<User | null>;
  
  public user: Observable<User | null>;

  constructor(private router: Router, private httpClient: HttpClient)
  {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public isLogged() { if (this.userSubject.value) { return true; } return false; }
  public getUsername() { if (this.userSubject.value) { return this.userSubject.value.username; } return ""; }
  
  signIn(user: User): Observable<User>
  {
    return this.httpClient.post<User>(`${this.baseURLsig}/in`, user);
    
    //return this.httpClient.post<User>(`${this.baseURLlog}/in`, user).pipe(map(u => { alert(u); localStorage.setItem('user', JSON.stringify(u)); this.userSubject.next(u); return u; }));
  }

  signOut() 
  {
    this.httpClient.post<User>(`${this.baseURLsig}/signout`, null);
    
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  getListArrives(): Observable<User[]> { return this.httpClient.get<User[]>(`${this.baseURLsig}/list`); }

  getProfil(): Observable<Participant>{ return this.httpClient.get<Participant>(`${this.baseURLacc}/form}`); }

  updateProfil(participant: Participant): Observable<Object>{ return this.httpClient.put(`${this.baseURLacc}/update`, participant); }

}