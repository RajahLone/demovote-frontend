import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

import { MenuComponent } from '../menu/menu.component';
import { MessageShort } from '../../interfaces/chat';
import { ChatService } from '../../services/chat.service';

@Component({ selector: 'app-chat', imports: [MenuComponent], templateUrl: './chat.component.html', styleUrl: './chat.component.css' })

export class ChatComponent implements OnInit
{

  dernierNumero: number = 0;

  lignes: MessageShort[] = [];

  ajoute: MessageShort = new MessageShort();

  constructor(private chatService: ChatService) { }

  ngOnInit()
  {
    this.recupererToutesLignes();

    timer(0, 7000).subscribe(() => { this.recupererDernieresLignes(); });
  }

  recupererToutesLignes() { this.chatService.getList().subscribe(data => { this.lignes = data; }); this.setDernierNumero(); }

  recupererDernieresLignes() { this.chatService.getNew(this.dernierNumero).subscribe(data => { this.lignes = [...this.lignes, ...data]; }); this.setDernierNumero(); }

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
    this.chatService.addNew(this.dernierNumero, this.ajoute).subscribe(data => { this.lignes = [...this.lignes, ...data]; }); this.setDernierNumero();
  }

}
