import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'

import { Environnement } from '../../env';
import { MenuComponent } from '../menu/menu.component';
import { ProductionFile } from '../../interfaces/production';
import { ProductionService } from '../../services/production.service';
import { Message } from '../../interfaces/divers';

@Component({ selector: 'app-production-upload', imports: [FormsModule, MenuComponent], templateUrl: './production-upload.component.html', styleUrl: './production-upload.component.css' })

export class ProductionUploadComponent implements OnInit
{

  @ViewChild('formRef') productionForm!: NgForm;
  @ViewChild('boutonUploader', {static: false}) boutonUploader!: ElementRef;
  @ViewChild('messageUpload', {static: false}) messageUpload!: ElementRef;
  @ViewChild('messageErreur', {static: false}) messageErreur!: ElementRef;

  production: ProductionFile = new ProductionFile();

  numeroProduction: number = 0;
  uploaderFichier: boolean = false;
  fichier!: any;
  reliquat: number = 0;

  constructor(
    private productionService: ProductionService,
    private route: ActivatedRoute,
    private router: Router,
    private menu: MenuComponent,
    private renderer: Renderer2,
    private httpClient: HttpClient
  ) { }

  ngOnInit()
  {
    this.numeroProduction = this.route.snapshot.params['numeroProduction'];
    this.productionService.getByIdProductionFile(this.numeroProduction).subscribe(data => { this.production = data; });
  }

  onArchiveSelected(event: any)
  {
    const et = event.target;

    if (et.files && et.files.length > 0)
    {
      this.fichier = et.files[0];
      this.uploaderFichier = true;
		}
  }

  async saveProduction()
  {
    this.setBoutonUploadStart();

    const chunkSize = 1024 * 1024;
    let start = 0;
    let chunkIndex = 0;

    this.reliquat = 0;

    try
    {
      while (start < this.fichier.size)
      {
        const chunk = this.fichier.slice(start, start + chunkSize);

        await this.productionService.uploadChunk(this.numeroProduction, chunk, chunkIndex, this.fichier.name);

        this.reliquat += chunk.size;
        this.setMessageUpload('&nbsp;' + Math.floor((this.reliquat*100)/this.fichier.size) + '%');

        start += chunkSize;
        chunkIndex++;
      }
    }
    catch (err:any) { console.error(err); }
    finally
    {
      this.productionService.mergeChunks(this.numeroProduction, this.fichier.name, chunkIndex).subscribe({
        next: (msg) => { this.setBoutonUploadEnd(); if (msg.erreur) { this.setMessageErreur(msg.erreur); } else { this.goToListProduction(); } },
        error: (e:HttpErrorResponse) => { this.setBoutonUploadEnd(); this.setMessageErreur(e.error.message); },
        complete: () => { }
      });
    }
  }
  private setMessageUpload(m: string) { if (this.messageUpload) { this.renderer.setProperty(this.messageUpload.nativeElement, 'innerHTML', m); } }
  private setMessageErreur(m: string) { if (this.messageErreur) { this.renderer.setProperty(this.messageErreur.nativeElement, 'innerHTML', m); } }
  private setBoutonUploadStart() { if (this.boutonUploader) { this.renderer.setProperty(this.boutonUploader.nativeElement, 'innerHTML', '<i class="fa-solid fa-upload fa-fade"></i>&nbsp;' + $localize`Téléversement en cours`); } }
  private setBoutonUploadEnd() { if (this.boutonUploader) { this.renderer.setProperty(this.boutonUploader.nativeElement, 'innerHTML', '<i class="fa-solid fa-upload"></i>&nbsp;' + $localize`Téléverser`); }  }

  addProductionFile() { this.saveProduction(); }

  goToListProduction() { this.router.navigate(['/production-list', this.menu.getRandomInteger(1, 100000)]); }

}
