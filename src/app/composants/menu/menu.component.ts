import { Injectable, Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AccountService } from '../../services/account.service';  
import { TooltipModule } from 'ngx-bootstrap/tooltip'; 

@Component({ selector: 'app-menu', imports: [TooltipModule, RouterLink, RouterLinkActive], templateUrl: './menu.component.html', styleUrl: './menu.component.css' })

@Injectable({ providedIn: 'root' })

export class MenuComponent implements OnInit 
{

  logged: boolean = false;
  
  role: String = "";

  constructor(private router: Router, private accountService: AccountService) {  }  
  
  ngOnInit() 
  { 
    this.logged = this.accountService.isLogged(); 
    this.role = this.accountService.getRole();
  }
  
  deconnexion() { this.accountService.signOut(); window.location.reload(); } 
  
  getRandomInteger(min: number, max: number) { min = Math.ceil(min); max = Math.floor(max); return Math.floor(Math.random() * (max - min)) + min; }

}
