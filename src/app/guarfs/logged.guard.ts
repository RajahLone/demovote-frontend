import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AccountService } from '../services/account.service';

@Injectable({ providedIn: 'root' })

export class LoggedGuard implements CanActivate 
{      
 
  constructor(private router: Router, private accountService: AccountService) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean 
  {      
    if (this.accountService.isLogged()) { return true; }

    return false;      
  }
   
}    