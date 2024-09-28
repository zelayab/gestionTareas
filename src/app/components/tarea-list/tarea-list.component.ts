import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Tarea } from '../../models/model.interface';
import { eliminarTarea, marcarTareaCompletada } from '../../store/actions/tareas.actions';
import { selectTareasState } from '../../store/tarea.slice';

@Component({
  standalone: true,
  selector: 'app-tarea-list',
  templateUrl: './tarea-list.component.html',
  imports: [CommonModule]
})
export class TareaListComponent {
  tareas$: Observable<Tarea[]>;
  tareasFiltradas: Tarea[] = [];
  filtroActual: 'todas' | 'completadas' | 'pendientes' = 'todas';

  toastVisible = false;
  toastMessage = '';

  constructor(private store: Store) {
    this.tareas$ = this.store.select(selectTareasState);
    this.tareas$.subscribe(tareas => this.aplicarFiltro(tareas));
  }

  cambiarFiltro(filtro: 'todas' | 'completadas' | 'pendientes') {
    this.filtroActual = filtro;
    this.tareas$.subscribe(tareas => this.aplicarFiltro(tareas));
  }

aplicarFiltro(tareas: Tarea[]) {
  if (!Array.isArray(tareas)) {
    // Si tareas no es un array, asignar un array vacío
    this.tareasFiltradas = [];
    return;
  }

  switch (this.filtroActual) {
    case 'completadas':
      this.tareasFiltradas = tareas.filter(tarea => tarea.completada);
      break;
    case 'pendientes':
      this.tareasFiltradas = tareas.filter(tarea => !tarea.completada);
      break;
    default:
      this.tareasFiltradas = tareas;
  }
}


  completarTarea(id: number) {
    this.store.dispatch(marcarTareaCompletada({ id }));
    this.showToast('Tarea completada con éxito');
  }

  eliminarTarea(id: number) {
    this.store.dispatch(eliminarTarea({ id }));
    this.showToast('Tarea eliminada con éxito');
  }

  showToast(message: string) {
    this.toastMessage = message;
    this.toastVisible = true;
    setTimeout(() => this.toastVisible = false, 2000);
  }

  // Ocultar el Toast manualmente
  hideToast() {
    this.toastVisible = false;
  }
}
