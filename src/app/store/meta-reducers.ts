import { ActionReducer, MetaReducer } from '@ngrx/store';
import { saveToLocalStorage } from '../utils/localStorage.utils';

// MetaReducer que guarda el estado de las tareas en localStorage
export function localStorageMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    const nextState = reducer(state, action);
    saveToLocalStorage(nextState.tareas);  // Solo guardamos el estado de tareas
    return nextState;
  };
}

export const metaReducers: MetaReducer<any>[] = [localStorageMetaReducer];
