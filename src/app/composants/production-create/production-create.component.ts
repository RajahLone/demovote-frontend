import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http'

import { MenuComponent } from '../menu/menu.component';
import { Production, ProductionEnum, ProductionTypeList } from '../../interfaces/production';
import { ProductionService } from '../../services/production.service';
import { ParticipantShort } from '../../interfaces/participant';
import { ParticipantService } from '../../services/participant.service';
import { AccountService } from '../../services/account.service'

@Component({ selector: 'app-production-create', imports: [FormsModule, MenuComponent], templateUrl: './production-create.component.html', styleUrl: './production-create.component.css' })

export class ProductionCreateComponent implements OnInit
{

  participants: ParticipantShort[] = [];

  types: ProductionEnum[] = ProductionTypeList;

  @ViewChild('formRef') productionForm!: NgForm;
  @ViewChild('boutonUploader', {static: false}) boutonUploader!: ElementRef;
  @ViewChild('messageUpload', {static: false}) messageUpload!: ElementRef;
  @ViewChild('messageErreur', {static: false}) messageErreur!: ElementRef;

  production: Production = new Production();
  uploaderFichier: boolean = false;
  fichier!: any;
  reliquat: number = 0;
  chunkIndex = 0;

  constructor(
    private accountService : AccountService,
    private productionService: ProductionService,
    private participantService: ParticipantService,
    private router: Router,
    private menu: MenuComponent,
    private renderer: Renderer2
  ) { }

  ngOnInit() { this.retreiveParticipants(); this.production.numeroParticipant = this.accountService.getNumeroParticipant(); }

  private retreiveParticipants() { this.participantService.getOptionListParticipant().subscribe(data => { this.participants = data; }); }

  onArchiveSelected(event: any)
  {
    const et = event.target;
    const reader = new FileReader();

    if (et.files && et.files.length > 0)
    {
      const file = et.files[0];

      this.production.nomArchive = "";
      this.production.numeroVersion = 0;

      this.fichier = et.files[0];
      this.uploaderFichier = true;
		}
  }

  onVignetteSelected(event: any)
  {
    const et = event.target;
    const reader = new FileReader();

    if (et.files && et.files.length > 0)
    {
      const file = et.files[0];

      reader.onloadend = async (e: any) => { if (e.target.result) { this.production.vignette = e.target.result; } }

      reader.readAsDataURL(file);
		}
  }

  async saveArchive(id: number)
  {
    const chunkSize = 1024 * 1024;
    let start = 0;

    this.chunkIndex = 0;
    this.reliquat = 0;

    try
    {
      while (start < this.fichier.size)
      {
        const chunk = this.fichier.slice(start, start + chunkSize);

        await this.productionService.uploadChunk(id, chunk, this.chunkIndex, this.fichier.name);

        this.reliquat += chunk.size;
        this.setMessageUpload('&nbsp;' + Math.floor((this.reliquat*100)/this.fichier.size) + '%');

        start += chunkSize;
        this.chunkIndex++;
      }
    }
    catch (err:any) { console.error(err); }
    finally
    {
      this.productionService.mergeChunks(id, this.fichier.name, this.chunkIndex).subscribe({
        next: (msg) => { this.setBoutonUploadEnd(); if (msg.erreur) { this.setMessageErreur(msg.erreur); } else { this.goToListProduction(); } },
        error: (e:HttpErrorResponse) => { this.setBoutonUploadEnd(); this.setMessageErreur(e.error.message); },
        complete: () => { }
      });
    }
  }
  private saveProduction()
  {
    this.setBoutonUploadStart();

    this.productionService.createProduction(this.production).subscribe({
      next: async (ret) => { await this.saveArchive(Number('' + ret)); this.setBoutonUploadEnd(); this.goToListProduction(); },
      error: (e:HttpErrorResponse) => { this.setBoutonUploadEnd(); this.setMessageErreur(e.error.message); },
      complete: () => { }
    });
  }
  private setMessageUpload(m: string) { if (this.messageUpload) { this.renderer.setProperty(this.messageUpload.nativeElement, 'innerHTML', m); } }
  private setMessageErreur(m: string) { if (this.messageErreur) { this.renderer.setProperty(this.messageErreur.nativeElement, 'innerHTML', m); } }
  private setBoutonUploadStart() { if (this.boutonUploader && this.uploaderFichier) { this.renderer.setProperty(this.boutonUploader.nativeElement, 'innerHTML', '<i class="fa-solid fa-upload fa-fade"></i>&nbsp;' + $localize`Téléversement en cours`); } }
  private setBoutonUploadEnd() { if (this.boutonUploader) { this.renderer.setProperty(this.boutonUploader.nativeElement, 'innerHTML', '<i class="fa-solid fa-plus"></i>&nbsp;' + $localize`Créer`); }  }

  addProduction() { if (this.productionForm.valid) { this.saveProduction(); } }

  goToListProduction() { this.router.navigate(['/production-list', this.menu.getRandomInteger(1, 100000)]); }

}
