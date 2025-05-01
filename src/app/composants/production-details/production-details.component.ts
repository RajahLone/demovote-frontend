import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MenuComponent } from '../menu/menu.component';
import { ProductionShort, ProductionEnum, ProductionTypeList } from '../../interfaces/production';
import { ProductionService } from '../../services/production.service';

@Component({ selector: 'app-production-details', imports: [FormsModule, MenuComponent], templateUrl: './production-details.component.html', styleUrl: './production-details.component.css' })

export class ProductionDetailsComponent implements OnInit
{

  numeroProduction: number = 0;

  types: ProductionEnum[] = ProductionTypeList;

  production: ProductionShort = new ProductionShort();

  constructor(private productionService: ProductionService, private route: ActivatedRoute, private router: Router, private menu: MenuComponent) { }

  ngOnInit()
  {
    this.numeroProduction = this.route.snapshot.params['numeroProduction'];
    this.production = new ProductionShort();
    this.productionService.getByIdProduction(this.numeroProduction).subscribe( data => { this.production = data; });
  }

  updateArchive(id: number) { this.router.navigate(['/production-upload', id]); }

  updateProduction(id: number) { this.router.navigate(['/production-update', id]); }

  goToListProduction() { this.router.navigate(['/production-list']); }

}
