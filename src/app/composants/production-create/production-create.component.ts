import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http'
import * as SparkMD5 from 'spark-md5';

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
  @ViewChild('labelMessage', {static: false}) labelMessage!: ElementRef;

  production: Production = new Production();
  uploaderFichier: boolean = false;
  fichier!: any;
  reliquat: number = 0;
  digestat: string = "";
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
      this.computeChecksumMd5(this.fichier).then(md5 => { this.digestat = md5 });
		}
  }
  /** https://dev.to/qortex/compute-md5-checksum-for-a-file-in-typescript-59a4 */
  computeChecksumMd5(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const chunkSize = 2097152;
      const spark = new SparkMD5.ArrayBuffer();
      const fileReader = new FileReader();
      let cursor = 0;

      fileReader.onerror = function(): void { reject('MD5 computation failed - error reading the file'); };

      function processChunk(chunk_start: number): void { const chunk_end = Math.min(file.size, chunk_start + chunkSize); fileReader.readAsArrayBuffer(file.slice(chunk_start, chunk_end)); }

      fileReader.onload = function(e: any): void { spark.append(e.target.result); cursor += chunkSize; if (cursor < file.size) { processChunk(cursor); } else { resolve(spark.end()); } };

      processChunk(0);
    });
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
    const spark = new SparkMD5.ArrayBuffer();
    const chunkSize = 1024 * 1024;
    let start = 0;

    this.chunkIndex = 0;
    this.reliquat = 0;

    try
    {
      while (start < this.fichier.size)
      {
        const end = Math.min(this.fichier.size, start + chunkSize);
        const chunk = this.fichier.slice(start, end);

        await this.productionService.uploadChunk(id, chunk, this.chunkIndex, this.fichier.name);

        this.reliquat += chunk.size;
        let pourcentage = Math.floor((this.reliquat*100)/this.fichier.size);
        this.setMessage('<div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100"><div class="progress-bar" style="width:' + pourcentage +'%">' + pourcentage + '%</div></div>', false);

        start += chunkSize;
        this.chunkIndex++;
      }
    }
    catch (err:any) { console.error(err); }
    finally
    {
      this.productionService.mergeChunks(id, this.fichier.name, this.chunkIndex, this.digestat).subscribe({
        next: (msg) => { this.setBoutonUploadEnd(); if (msg.erreur) { this.setMessage(msg.erreur, true); } else { this.goToListProduction(); } },
        error: (e:HttpErrorResponse) => { this.setBoutonUploadEnd(); this.setMessage(e.error.message, true); },
        complete: () => { }
      });
    }
  }
  private saveProduction()
  {
    this.setBoutonUploadStart();

    this.productionService.createProduction(this.production).subscribe({
      next: async (ret) => { await this.saveArchive(Number('' + ret)); this.setBoutonUploadEnd(); this.goToListProduction(); },
      error: (e:HttpErrorResponse) => { this.setBoutonUploadEnd(); this.setMessage(e.error.message, true); },
      complete: () => { }
    });
  }
  private setMessage(m: string, e: boolean) { if (this.labelMessage) { this.renderer.setProperty(this.labelMessage.nativeElement, 'innerHTML', m); if (e) { this.renderer.addClass(this.labelMessage.nativeElement, 'text-danger'); } else { this.renderer.removeClass(this.labelMessage.nativeElement, 'text-danger'); } } }
  private setBoutonUploadStart() { if (this.boutonUploader && this.uploaderFichier) { this.renderer.setProperty(this.boutonUploader.nativeElement, 'innerHTML', '<i class="fa-solid fa-upload fa-fade"></i>&nbsp;' + $localize`Téléversement en cours`); } }
  private setBoutonUploadEnd() { if (this.boutonUploader) { this.renderer.setProperty(this.boutonUploader.nativeElement, 'innerHTML', '<i class="fa-solid fa-plus"></i>&nbsp;' + $localize`Créer`); }  }

  addProduction() { if (this.productionForm.valid) { this.saveProduction(); } }

  goToListProduction() { this.router.navigate(['/production-list', this.menu.getRandomInteger(1, 100000)]); }

}
