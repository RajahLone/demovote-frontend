import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import * as SparkMD5 from 'spark-md5';

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
  @ViewChild('labelMessage', {static: false}) labelMessage!: ElementRef;

  production: ProductionFile = new ProductionFile();

  numeroProduction: number = 0;
  uploaderFichier: boolean = false;
  fichier!: any;
  reliquat: number = 0;
  digestat: string = "";

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
      this.computeChecksumMd5(this.fichier).then(md5 => { this.digestat = md5; console.log(md5); });
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
        const end = Math.min(this.fichier.size, start + chunkSize);
        const chunk = this.fichier.slice(start, end);

        await this.productionService.uploadChunk(this.numeroProduction, chunk, chunkIndex, this.fichier.name);

        this.reliquat += chunk.size;
        let pourcentage = Math.floor((this.reliquat*100)/this.fichier.size);
        this.setMessage('<div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100"><div class="progress-bar" style="width:' + pourcentage +'%">' + pourcentage + '%</div></div>', false);

        start += chunkSize;
        chunkIndex++;
      }
    }
    catch (err:any) { console.error(err); }
    finally
    {
      this.productionService.mergeChunks(this.numeroProduction, this.fichier.name, chunkIndex, this.digestat).subscribe({
        next: (msg) => { this.setBoutonUploadEnd(); if (msg.erreur) { this.setMessage(msg.erreur, true); } else { this.goToListProduction(); } },
        error: (e:HttpErrorResponse) => { this.setBoutonUploadEnd(); this.setMessage(e.error.message, true); },
        complete: () => { }
      });
    }
  }
  private setMessage(m: string, e: boolean) { if (this.labelMessage) { this.renderer.setProperty(this.labelMessage.nativeElement, 'innerHTML', m); if (e) { this.renderer.addClass(this.labelMessage.nativeElement, 'text-danger'); } else { this.renderer.removeClass(this.labelMessage.nativeElement, 'text-danger'); } } }
  private setBoutonUploadStart() { if (this.boutonUploader) { this.renderer.setProperty(this.boutonUploader.nativeElement, 'innerHTML', '<i class="fa-solid fa-upload fa-fade"></i>&nbsp;' + $localize`Téléversement en cours`); } }
  private setBoutonUploadEnd() { if (this.boutonUploader) { this.renderer.setProperty(this.boutonUploader.nativeElement, 'innerHTML', '<i class="fa-solid fa-upload"></i>&nbsp;' + $localize`Téléverser`); }  }

  addProductionFile() { this.saveProduction(); }

  goToListProduction() { this.router.navigate(['/production-list']); }

}
