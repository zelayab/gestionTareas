import { createAction, props } from '@ngrx/store';
import { Persona, Tarea } from '../../models/model.interface';

export const agregarTarea = createAction(
  '[Tareas] Agregar Tarea',
  props<{ tarea: Tarea }>()
);

export const eliminarTarea = createAction(
  '[Tareas] Eliminar Tarea',
  props<{ id: number }>()
);

export const marcarTareaCompletada = createAction(
  '[Tareas] Marcar Tarea Completada',
  props<{ id: number }>()
);

export const agregarPersonaATarea = createAction(
  '[Tareas] Agregar Persona a Tarea',
  props<{ tareaId: number; persona: Persona }>()
);

export const eliminarPersonaDeTarea = createAction(
  '[Tareas] Eliminar Persona de Tarea',
  props<{ tareaId: number; personaId: number }>()
);


