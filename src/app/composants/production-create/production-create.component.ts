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
  @ViewChild('messageErreur', {static: false}) messageErreur!: ElementRef;

  production: Production = new Production();
  uploaderFichier: boolean = false;

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

      this.production.nomArchive = file.name;
      this.production.numeroVersion = 1;

      reader.onloadend = async (e: any) => { if (e.target.result) { this.production.archive = e.target.result; this.uploaderFichier = true; } }

      reader.readAsDataURL(file);
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

  private saveProduction()
  {
    this.uploadStart();
    this.productionService.createProduction(this.production).subscribe({
      next: () => {},
      error: (e:HttpErrorResponse) => { this.uploadEnd(); if (this.messageErreur) { this.renderer.setProperty(this.messageErreur.nativeElement, 'innerHTML', e.error.message); } else { alert(e.error.message); } },
      complete: () => { this.uploadEnd(); this.goToListProduction(); }
    });
  }
  private uploadStart() { if (this.boutonUploader &&this.uploaderFichier) { this.renderer.setProperty(this.boutonUploader.nativeElement, 'innerHTML', '<i class="fa-solid fa-upload fa-fade"></i>&nbsp;' + $localize`Téléversement en cours`); } }
  private uploadEnd() { if (this.boutonUploader) { this.renderer.setProperty(this.boutonUploader.nativeElement, 'innerHTML', '<i class="fa-solid fa-plus"></i>&nbsp;' + $localize`Créer`); }  }

  addProduction() { if (this.productionForm.valid) { this.saveProduction(); } }

  goToListProduction() { this.router.navigate(['/production-list', this.menu.getRandomInteger(1, 100000)]); }

}
