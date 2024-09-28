import { Tarea } from "../models/model.interface";

// Definir un conjunto de tareas mockeadas
export const MOCKED_TAREAS: Tarea[] = [
  {
    id: 1,
    nombre: 'Tarea Mock 1',
    fechaLimite: new Date('2021-12-31'),
    completada: false,
    personas: []
  },
  {
    id: 2,
    nombre: 'Tarea Mock 2',
    completada: true,
    fechaLimite: new Date('2021-12-31'),
    personas: [
      {
        id: 1,
        nombre: 'Persona 1',
        edad: 25,
        habilidades: [
          {
            descripcion: 'Habilidad 1'
          },
          {
            descripcion: 'Habilidad 2'
          }
        ]
      },
      {
        id: 2,
        nombre: 'Persona 2',
        edad: 30,
        habilidades: [
          {
            descripcion: 'Habilidad 2'
          }
        ]
      }
    ]
  },
  {
    id: 3,
    nombre: 'Tarea Mock 3',
    fechaLimite: new Date('2021-12-31'),
    completada: false,
    personas: [
      {
        id: 2,
        nombre: 'Persona 2',
        edad: 30,
        habilidades: [
          {
            descripcion: 'Habilidad 2'
          }
        ]
      }
    ]
  }
];
