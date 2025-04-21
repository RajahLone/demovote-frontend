import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

import { MenuComponent } from '../menu/menu.component';
import { PresentationFile } from '../../interfaces/production';
import { PresentationService } from '../../services/presentation.service';

import { ProductionShort, ProductionEnum, ProductionTypeList } from '../../interfaces/production';
import { ProductionService } from '../../services/production.service';

@Component({ selector: 'app-show-upload', imports: [FormsModule, MenuComponent], templateUrl: './show-upload.component.html', styleUrl: './show-upload.component.css' })

export class ShowUploadComponent implements OnInit
{

  @ViewChild('formRef') productionForm!: NgForm;

  numeroProduction: number = 0;

  types: ProductionEnum[] = ProductionTypeList;

  production: ProductionShort = new ProductionShort();

  media: PresentationFile = new PresentationFile();
  etatInitial: number = 0;

  constructor(
    private productionService: ProductionService,
    private presentationService: PresentationService,
    private route: ActivatedRoute,
    private router: Router,
    private menu: MenuComponent
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

      reader.onloadend = async (e: any) => { if (e.target.result) { this.media.mediaData = e.target.result; this.media.mediaName = file.name; this.media.etatMedia = 1; } }

      reader.readAsDataURL(file);
		}
  }

  private saveMedia() { this.presentationService.uploadMediaFile(this.numeroProduction, this.media).subscribe(() => { this.goToListPresentation(); }); }

  addPresentationFile() { this.saveMedia(); }

  goToListPresentation() { this.router.navigate(['/show-list', this.menu.getRandomInteger(1, 100000)]); }

}
