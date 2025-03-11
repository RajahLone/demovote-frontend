import { Injectable } from '@angular/core';
import { Login } from '../interfaces/login';
import { HttpClient } from '@angular/common/http'

@Injectable({ providedIn: 'root'})

export class AuthService 
{

  private baseURL = "http://localhost:8080/demovote-api/v1/variable";

  constructor(private httpClient: HttpClient) { }
 
  connexion(identifiants: Login): void
  {
    
  }
  
  deconnexion(): void 
  {
    localStorage.setItem('isLoggedIn','false');    
    localStorage.removeItem('token');    
  }
  
}
