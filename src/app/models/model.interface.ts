export interface Persona {
  nombre: string;
  edad: number;
  habilidades: Habilidad[];
  id: number;
}

export interface Habilidad {
  descripcion: string;
}

export interface Tarea {
  id: number;
  nombre: string;
  fechaLimite: Date;
  completada: boolean;
  personas: Persona[];
}
