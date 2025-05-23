import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { Variable, VariableType } from '../../interfaces/variable';
import { VariableService } from '../../services/variable.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({ selector: 'app-variable-list', imports: [FormsModule, MenuComponent], templateUrl: './variable-list.component.html', styleUrl: './variable-list.component.css' })

export class VariableListComponent implements OnInit
{

  types: VariableType[] = [];
  typeFiltre: string = "";

  variables: Variable[] = [];

  constructor(
    private variableService: VariableService,
    private route: ActivatedRoute,
    private router: Router,
    private menu: MenuComponent
  ) { }

  ngOnInit() { this.goToRefreshListVariable(); }

  private retreiveDatas() { this.variableService.getListVariable(this.typeFiltre).subscribe(data => { this.variables = data; }); }
  private retreiveTypes() { this.variableService.getOptionListVariableType().subscribe(data => { this.types = data; }); }

  filtrageParType(event: any) { this.typeFiltre = event.target.value; this.goToRefreshListVariable(); }

  goToRefreshListVariable() { this.retreiveTypes(); this.retreiveDatas();  }

  goToNewVariable() { this.router.navigate(['/variable-create']); }

  formVariable(id: number) { this.router.navigate(['/variable-details', id]); }

}
