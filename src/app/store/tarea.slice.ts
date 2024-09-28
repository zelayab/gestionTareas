import { createFeature, createReducer, on } from '@ngrx/store';
import { Tarea } from '../models/model.interface';
import { agregarTarea, eliminarTarea, marcarTareaCompletada } from './actions/tareas.actions';

// Estado inicial
export const initialState: Tarea[] = [];

// Reducer
const tareasReducer = createReducer(
  initialState,
  on(agregarTarea, (state, { tarea }) => [...state, tarea]),
  on(eliminarTarea, (state, { id }) => state.filter(tarea => tarea.id !== id)),
  on(marcarTareaCompletada, (state, { id }) =>
    state.map(tarea => (tarea.id === id ? { ...tarea, completada: true } : tarea))
  )
);

// Definimos el feature con su nombre y reducer
export const tareasFeature = createFeature({
  name: 'tareas',
  reducer: tareasReducer
});

// Usamos el selector generado automáticamente por createFeature
export const selectTareasState = tareasFeature.selectTareasState;
