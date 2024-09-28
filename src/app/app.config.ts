import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideState, provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import { metaReducers } from './store/meta-reducers';
import { tareasReducer } from './store/reducer/tareas.reducer';
import { loadAndCombineWithMocked } from './utils/localStorage.utils';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideStore(
      { tareas: tareasReducer },
      { initialState: { tareas: loadAndCombineWithMocked() }, metaReducers }
    ),
    provideRouter(routes),
    provideState('tareas', tareasReducer)
  ]
};
