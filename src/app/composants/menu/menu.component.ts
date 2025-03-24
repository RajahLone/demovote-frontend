import { Injectable, Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@Component({ selector: 'app-menu', imports: [TooltipModule, RouterLink, RouterLinkActive], templateUrl: './menu.component.html', styleUrl: './menu.component.css' })

@Injectable({ providedIn: 'root' })

export class MenuComponent implements OnInit, AfterViewInit
{

  logged: boolean = false;

  role: string = "";

  constructor(private router: Router, private accountService: AccountService) {  }

  ngOnInit()
  {
    this.logged = this.accountService.isLogged();
    this.role = this.accountService.getRole();
  }

  ngAfterViewInit() { }

  deconnexion() { this.accountService.signOut(); if ((this.router.url === '/') || (this.router.url === '/home')) { window.location.reload(); } else { this.router.navigate(['/']); }  }

  getRandomInteger(min: number, max: number) { min = Math.ceil(min); max = Math.floor(max); return Math.floor(Math.random() * (max - min)) + min; }

}
