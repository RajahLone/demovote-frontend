import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule} from '@angular/forms';

declare var $: any;

@Component({ selector: 'app-root', imports: [RouterOutlet, FormsModule], templateUrl: './app.component.html', styleUrl: './app.component.css' })

export class AppComponent 
{
  title = 'demovote';

  ngOnInit() 
  {
    $(document).ready(function() { $('[data-bs-toggle="tooltip"]').tooltip();});
  }

}
