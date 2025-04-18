import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MenuComponent } from '../menu/menu.component';
import { ProductionFile } from '../../interfaces/production';
import { ProductionService } from '../../services/production.service';

@Component({ selector: 'app-production-upload', imports: [FormsModule, MenuComponent], templateUrl: './production-upload.component.html', styleUrl: './production-upload.component.css' })

export class ProductionUploadComponent implements OnInit
{

  production: ProductionFile = new ProductionFile();

  numeroProduction: number = 0;

  constructor(private productionService: ProductionService, private route: ActivatedRoute, private router: Router, private menu: MenuComponent) { }

  ngOnInit()
  {
    this.numeroProduction = this.route.snapshot.params['numeroProduction'];
    this.productionService.getByIdProductionFile(this.numeroProduction).subscribe(data => { this.production = data; });
  }

  onArchiveSelected(event: any)
  {
    const et = event.target;
    const reader = new FileReader();

    if (et.files && et.files.length > 0)
    {
      const file = et.files[0];

      this.production.nomArchive = file.name;

      reader.onloadend = async (e: any) => { if (e.target.result) { this.production.archive = e.target.result; } }

      reader.readAsDataURL(file);
		}
  }

  private saveProduction() { this.productionService.uploadProductionFile(this.numeroProduction, this.production).subscribe(); this.goToListProduction(); }

  addProductionFile() { this.saveProduction(); }

  goToListProduction() {this.router.navigate(['/production-list'], { queryParams: { 'refresh': this.menu.getRandomInteger(1, 100000) } }); }

}
