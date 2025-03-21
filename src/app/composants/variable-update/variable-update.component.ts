import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { Variable } from '../../interfaces/variable';
import { VariableService } from '../../services/variable.service';
import { FormsModule, NgForm } from '@angular/forms'; 

@Component({ selector: 'app-variable-update', imports: [FormsModule, MenuComponent], templateUrl: './variable-update.component.html', styleUrl: './variable-update.component.css' })

export class VariableUpdateComponent implements OnInit, AfterViewInit
{

  @ViewChild('formRef') variableForm!: NgForm;

  numeroVariable: number = 0;
  
  variable: Variable = new Variable();
  
  constructor(private variableService: VariableService, private route: ActivatedRoute, private router: Router, private menu: MenuComponent) { }

  ngOnInit(): void 
  {
    this.numeroVariable = this.route.snapshot.params['numeroVariable'];
    this.variableService.getByIdVariable(this.numeroVariable).subscribe(data => { this.variable = data; });
  }
  
  ngAfterViewInit() { }

  updateConfirmed() { if (this.variableForm.valid) { this.variableService.updateVariable(this.numeroVariable, this.variable).subscribe(() => { this.goToListVariable(); }); } }

  deleteConfirmed() { this.variableService.deleteVariable(this.numeroVariable).subscribe(() => { this.goToListVariable(); }); }

  goToListVariable(){ this.router.navigate(['/variable-list'], { queryParams: { 'refresh': this.menu.getRandomInteger(1, 100000) } }); }

}
