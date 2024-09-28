import { MOCKED_TAREAS } from '../mock/mockedTareas';
import { Tarea } from '../models/model.interface';

export function saveToLocalStorage(tareasState: any) {
  try {
    const serializedState = JSON.stringify(tareasState);
    localStorage.setItem('tareasState', serializedState);
  } catch (e) {
    console.error('Error al guardar el estado en localStorage:', e);
  }
}

// Función que carga el estado desde localStorage y lo combina con las tareas mockeadas
export function loadAndCombineWithMocked(): Tarea[] {
  try {
    const serializedState = localStorage.getItem('tareasState');
    const storedTareas: Tarea[] = serializedState ? JSON.parse(serializedState) : [];

    // Verificar que storedTareas sea un array, si no, inicializar como un array vacío
    if (!Array.isArray(storedTareas)) {
      console.warn('Los datos en localStorage no son un array. Usando array vacío.');
      return [...MOCKED_TAREAS];  // Si no es un array, solo usamos las tareas mockeadas
    }

    // Combinar las tareas guardadas con las tareas mockeadas, evitando duplicados
    const combinedTareas = [...MOCKED_TAREAS];

    storedTareas.forEach(storedTarea => {
      // Si una tarea guardada no está en las mockeadas (basado en ID), la agregamos
      if (!combinedTareas.some(tarea => tarea.id === storedTarea.id)) {
        combinedTareas.push(storedTarea);
      }
    });

    return combinedTareas;
  } catch (e) {
    console.error('Error al cargar el estado desde localStorage:', e);
    return [...MOCKED_TAREAS];  // Si ocurre un error, usar solo las tareas mockeadas
  }
}
