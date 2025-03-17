import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { Environnement } from '../env';
import { User } from '../interfaces/user';

@Injectable({ providedIn: 'root' })

export class AccountService 
{

  private baseURL = Environnement.apiUrl + "auth";

  private userSubject: BehaviorSubject<User | null>;
  
  public user: Observable<User | null>;

  constructor(private router: Router, private httpClient: HttpClient)
  {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public isLogged() { if (this.userSubject.value) { return true; } return false; }
  public getUsername() { if (this.userSubject.value) { return this.userSubject.value.username; } return ""; }
  
  login(user: User) 
  {
    return this.httpClient.post<User>(`${this.baseURL}/signin`, user); //.pipe(map(u => { localStorage.setItem('user', JSON.stringify(u)); this.userSubject.next(u); return u; }));
  }

  logout() 
  {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }

  getListArrives(): Observable<User[]> { return this.httpClient.get<User[]>(`${this.baseURL}/available`); }

}