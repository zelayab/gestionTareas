import { createReducer, on } from '@ngrx/store';
import { MOCKED_TAREAS } from '../../mock/mockedTareas'; // Importa las tareas mockeadas
import { Tarea } from '../../models/model.interface';
import {
  agregarPersonaATarea,
  agregarTarea,
  eliminarPersonaDeTarea,
  eliminarTarea,
  marcarTareaCompletada
} from '../actions/tareas.actions';

// Verifica que MOCKED_TAREAS sea un array, sino usar un array vacío
export const initialState: Tarea[] = Array.isArray(MOCKED_TAREAS) ? MOCKED_TAREAS : [];

export const tareasReducer = createReducer(
  initialState,

  // Verifica que el estado siempre sea un array
  on(agregarTarea, (state, { tarea }) => {
    if (!Array.isArray(state)) {
      console.error('Estado no es un array. Iniciando con nueva tarea.');
      // Si el estado no es un array, iniciarlo con la nueva tarea
      return [tarea];
    }
    return [...state, tarea];
  }),

  on(eliminarTarea, (state, { id }) => {
    if (!Array.isArray(state)) {
      // Si no es un array, devolver el estado sin cambios
      return state;
    }
    return state.filter(tarea => tarea.id !== id);
  }),

  on(marcarTareaCompletada, (state, { id }) => {
    if (!Array.isArray(state)) {
      // Estado no es un array. No se puede mapear.
      return state;
    }
    return state.map(tarea =>
      tarea.id === id ? { ...tarea, completada: true } : tarea
    );
  }),

  on(agregarPersonaATarea, (state, { tareaId, persona }) => {
    if (!Array.isArray(state)) {
      // Estado no es un array. No se puede mapear.
      return state;
    }
    return state.map(tarea =>
      tarea.id === tareaId
        ? { ...tarea, personas: [...tarea.personas, persona] }
        : tarea
    );
  }),

  on(eliminarPersonaDeTarea, (state, { tareaId, personaId }) => {
    if (!Array.isArray(state)) {
      // Estado no es un array. No se puede filtrar personas.
      return state;
    }
    return state.map(tarea =>
      tarea.id === tareaId
        ? {
            ...tarea,
            personas: tarea.personas.filter(persona => persona.id !== personaId)
          }
        : tarea
    );
  })
);
