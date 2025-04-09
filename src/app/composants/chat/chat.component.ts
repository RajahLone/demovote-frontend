import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { timer } from 'rxjs';

import { MenuComponent } from '../menu/menu.component';
import { MessageShort } from '../../interfaces/chat';
import { PseudonymeList } from '../../interfaces/participant';
import { ChatService } from '../../services/chat.service';
import { AccountService } from '../../services/account.service'

@Component({ selector: 'app-chat', imports: [FormsModule, MenuComponent], templateUrl: './chat.component.html', styleUrl: './chat.component.css' })

export class ChatComponent implements OnInit
{

  logged: boolean = false;
  disabled: boolean = false;

  dernierNumero: number = 0;

  lignes: MessageShort[] = [];

  ajoute: MessageShort = new MessageShort();

  pseudonymes: PseudonymeList[] = [];

  constructor(private chatService: ChatService, private accountService: AccountService, private router: Router) { }

  ngOnInit()
  {
    this.logged = this.accountService.isLogged();

    if (this.logged)
    {
      this.ajoute.pseudonyme = this.accountService.getUsername();

      this.retreivePseudonymes();

      timer(0, 7000).subscribe(() => { this.recupererDernieresLignes(); });
    }
  }

  recupererDernieresLignes()
  {
    if ((this.router.url !== '/chat')) { return; }

    this.logged = this.accountService.isLogged();

    if ((this.logged) && (this.disabled == false))
    {
      this.chatService.getNew(this.dernierNumero).subscribe(data => { if (data) { this.lignes = [...data, ...this.lignes]; } this.setDernierNumero(); });
    }
  }

  private setDernierNumero()
  {
    this.dernierNumero = 0;

    if (this.lignes != null)
    {
      if (this.lignes.length > 0)
      {
        for (let i = 0; i < this.lignes.length; i++) { this.dernierNumero = Math.max(this.dernierNumero, this.lignes[i].numeroMessage); }
      }
    }
  }

  envoiNouvelleLigne()
  {
    if (this.logged)
    {
      this.disabled = true;
      this.chatService.addNew(this.dernierNumero, this.ajoute).subscribe(data => {
        this.lignes = [...data, ...this.lignes];
        this.ajoute = new MessageShort();
        this.ajoute.pseudonyme = this.accountService.getUsername();
        this.setDernierNumero();
        this.disabled = false;
        });
    }
  }

  private retreivePseudonymes() { this.chatService.getOptionListPseudonyme().subscribe(data => { this.pseudonymes = data; }); }

}
