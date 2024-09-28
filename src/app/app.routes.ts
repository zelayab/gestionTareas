import { Routes } from '@angular/router';
import { TareaFormComponent } from './components/tarea-form/tarea-form.component';
import { TareaListComponent } from './components/tarea-list/tarea-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' }, // Redirigir a /tasks por defecto
  { path: 'tasks', component: TareaListComponent }, // Ruta para ver tareas
  { path: 'create-task', component: TareaFormComponent }, // Ruta para crear una tarea
  { path: '**', redirectTo: '/tasks' } // Redirigir cualquier ruta no válida a /tasks
];
