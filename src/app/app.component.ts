import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TareaFormComponent } from './components/tarea-form/tarea-form.component';
import { TareaListComponent } from './components/tarea-list/tarea-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule, RouterOutlet, TareaListComponent, TareaFormComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gestionTareas';

}
