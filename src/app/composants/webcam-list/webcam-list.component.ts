import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

import { MenuComponent } from '../menu/menu.component';
import { Webcam } from '../../interfaces/webcam';
import { WebcamService } from '../../services/webcam.service';

@Component({ selector: 'app-webcam-list', imports: [MenuComponent], templateUrl: './webcam-list.component.html', styleUrl: './webcam-list.component.css' })

export class WebcamListComponent implements OnInit
{

  webcams: Webcam[] = [];

  webcamu: Webcam = new Webcam();

  constructor(private webcamService: WebcamService, private router: Router) { }

  ngOnInit()
  {
    this.recupererToutesVues();

    timer(0, 15000).subscribe(() => { this.updaterVues(); });
  }

  recupererToutesVues() { this.webcamService.getList().subscribe(data => { this.webcams = data; }); }

  updaterVues()
  {
    if ((this.router.url !== '/webcam-list')) { return; }

    for (var i = 0; i < this.webcams.length; i++)
    {
      this.webcamu = new Webcam();
      this.webcamu.id = this.webcams[i].id;
      this.webcamu.crc32 = this.webcams[i].crc32;
      this.webcamu.vue = "";

      this.webcamService.updateVue(this.webcamu).subscribe(data => { this.webcamu = data; });

      if (this.webcamu.vue !== "")
      {
        this.webcams[i].crc32 = this.webcamu.crc32;
        this.webcams[i].vue = this.webcamu.vue;
      }
    }
  }

}
