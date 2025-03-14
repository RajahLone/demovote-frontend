import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { ProductionFile } from '../../interfaces/production';
import { ProductionService } from '../../services/production.service';
import { FormsModule } from '@angular/forms'; 

@Component({ selector: 'app-production-upload', imports: [FormsModule], templateUrl: './production-upload.component.html', styleUrl: './production-upload.component.css' })

export class ProductionUploadComponent implements OnInit, AfterViewInit
{

  production: ProductionFile = new ProductionFile();
  
  numeroProduction: number = 0;

  constructor(private productionService: ProductionService, private route: ActivatedRoute, private router: Router, private application: AppComponent) { }

  ngOnInit(): void 
  { 
    this.numeroProduction = this.route.snapshot.params['numeroProduction'];
    this.productionService.getByIdProductionFile(this.numeroProduction).subscribe(data => { this.production = data; });
  }
  
  ngAfterViewInit() { this.application.menuActivateProds(); }

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
 
  private saveProduction() { this.productionService.uploadProductionFile(this.numeroProduction, this.production).subscribe({ next: () => { this.goToListProduction(); }, error: (err: any) => { console.log(err); }, complete: () => { } }); }

  addProductionFile() { this.saveProduction(); }

  goToListProduction() {this.router.navigate(['/production-list'], { queryParams: { 'refresh': this.getRandomInteger(1, 100000) } }); }
  
  private getRandomInteger(min: number, max: number) { min = Math.ceil(min); max = Math.floor(max); return Math.floor(Math.random() * (max - min)) + min; }

}
