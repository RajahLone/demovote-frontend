import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { Variable } from '../../interfaces/variable';
import { VariableService } from '../../services/variable.service';
import { FormsModule } from '@angular/forms';

@Component({ selector: 'app-variable-details', imports: [FormsModule, MenuComponent], templateUrl: './variable-details.component.html', styleUrl: './variable-details.component.css' })

export class VariableDetailsComponent implements OnInit
{

  numeroVariable: number = 0;

  variable: Variable = new Variable();

  constructor(private variableService: VariableService, private router: Router, private route: ActivatedRoute, private menu: MenuComponent) { }

  ngOnInit(): void
  {
    this.numeroVariable = this.route.snapshot.params['numeroVariable'];
    this.variable = new Variable();
    this.variableService.getByIdVariable(this.numeroVariable).subscribe( data => { this.variable = data; });
  }

  updateVariable(id: number) { this.router.navigate(['/variable-update', id]); }

  goToListVariable() { this.router.navigate(['/variable-list']); }

}
