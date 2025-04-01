import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { Message } from '../../interfaces/divers';
import { AccountService } from '../../services/account.service'
import { DiversService } from '../../services/divers.service'

@Component({ selector: 'app-home', imports: [MenuComponent], templateUrl: './home.component.html', styleUrl: './home.component.css' })

export class HomeComponent implements OnInit, AfterViewInit
{

  logged: boolean = false;
  pseudonyme: string = "";
  message: Message = new Message();

  constructor(private diversService: DiversService, private accountService: AccountService) { }

  ngOnInit()
  {
    this.logged = this.accountService.isLogged();

    if (this.logged) { this.pseudonyme = this.accountService.getUsername(); }

    this.diversService.getMessage().subscribe(data => { this.message = data; });
  }

  ngAfterViewInit() { }

}
