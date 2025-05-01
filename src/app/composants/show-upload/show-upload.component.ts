import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http'

import { MenuComponent } from '../menu/menu.component';
import { PresentationFile } from '../../interfaces/production';
import { PresentationService } from '../../services/presentation.service';

import { ProductionShort, ProductionEnum, ProductionTypeList } from '../../interfaces/production';
import { ProductionService } from '../../services/production.service';

@Component({ selector: 'app-show-upload', imports: [FormsModule, MenuComponent], templateUrl: './show-upload.component.html', styleUrl: './show-upload.component.css' })

export class ShowUploadComponent implements OnInit
{

  @ViewChild('formRef') productionForm!: NgForm;
  @ViewChild('boutonUploader', {static: false}) boutonUploader!: ElementRef;
  @ViewChild('labelMessage', {static: false}) labelMessage!: ElementRef;

  numeroProduction: number = 0;

  types: ProductionEnum[] = ProductionTypeList;

  production: ProductionShort = new ProductionShort();

  media: PresentationFile = new PresentationFile();
  etatInitial: number = 0;
  uploaderFichier: boolean = false;

  constructor(
    private productionService: ProductionService,
    private presentationService: PresentationService,
    private route: ActivatedRoute,
    private router: Router,
    private menu: MenuComponent,
    private renderer: Renderer2
  ) { }

  ngOnInit()
  {
    this.numeroProduction = this.route.snapshot.params['numeroProduction'];
    this.production = new ProductionShort();
    this.productionService.getByIdProduction(this.numeroProduction).subscribe( data => { this.production = data; });
    this.presentationService.getByIdPresentationFile(this.numeroProduction).subscribe( data => { this.media = data; this.etatInitial = this.media.etatMedia; });
  }

  setEtatMedia(e: number) { this.media.etatMedia = e; }

  onMediaSelected(event: any)
  {
    const et = event.target;
    const reader = new FileReader();

    if (et.files && et.files.length > 0)
    {
      const file = et.files[0];

      reader.onloadend = async (e: any) => { if (e.target.result) { this.media.mediaData = e.target.result; this.media.mediaName = file.name; this.media.etatMedia = 1; this.uploaderFichier = true; } }

      reader.readAsDataURL(file);
		}
  }

  private saveMedia()
  {
    this.setMessage('');
    this.setBoutonUploadStart();
    this.presentationService.uploadMediaFile(this.numeroProduction, this.media).subscribe({
      next: () => {},
      error: (e:HttpErrorResponse) => { this.setBoutonUploadEnd(); this.setMessage(e.error.message); },
      complete: () => { this.setBoutonUploadEnd(); this.goToListPresentation(); }
    });
  }
  private setMessage(m: string) { if (this.labelMessage) { this.renderer.setProperty(this.labelMessage.nativeElement, 'innerHTML', m); } }
  private setBoutonUploadStart() { if (this.boutonUploader && this.uploaderFichier) { this.renderer.setProperty(this.boutonUploader.nativeElement, 'innerHTML', '<i class="fa-solid fa-upload fa-fade"></i>&nbsp;' + $localize`Téléversement en cours`); } }
  private setBoutonUploadEnd() { if (this.boutonUploader) { this.renderer.setProperty(this.boutonUploader.nativeElement, 'innerHTML', '<i class="fa-solid fa-check"></i>&nbsp;' + $localize`Valider`); }  }

  addPresentationFile() { this.saveMedia(); }

  goToListPresentation() { this.router.navigate(['/show-list']); }

}
