import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { agregarTarea } from '../../store/actions/tareas.actions';

@Component({
  standalone: true,
  selector: 'app-tarea-form',
  templateUrl: './tarea-form.component.html',
  imports: [CommonModule, ReactiveFormsModule, NgbAccordionModule  ]
})
export class TareaFormComponent {
  tareaForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.tareaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      fechaLimite: ['', Validators.required],
      personas: this.fb.array([], this.nombresUnicos)
    });
  }

  get personas(): FormArray {
    return this.tareaForm.get('personas') as FormArray;
  }

  // Validación personalizada para nombres únicos entre las personas
  nombresUnicos(control: AbstractControl): ValidationErrors | null {
    const personas = control.value;
    const nombres = personas.map((p: { nombre: string }) => p.nombre);
    const nombresUnicos = new Set(nombres);

    return nombres.length !== nombresUnicos.size ? { nombresRepetidos: true } : null;
  }

  addPersona() {
    const personaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      edad: ['', [Validators.required, Validators.min(19)]],
      habilidades: this.fb.array([this.newHabilidad()], Validators.required)
    });
    this.personas.push(personaForm);
  }

  getHabilidades(index: number): FormArray {
    return this.personas.at(index).get('habilidades') as FormArray;
  }

  newHabilidad() {
    return this.fb.control('', Validators.required);
  }

  addHabilidad(index: number) {
    this.getHabilidades(index).push(this.newHabilidad());
  }

  removePersona(index: number) {
    this.personas.removeAt(index);
  }

  removeHabilidad(personaIndex: number, habilidadIndex: number) {
    this.getHabilidades(personaIndex).removeAt(habilidadIndex);
  }

  onSubmit() {
    if (this.tareaForm.valid) {
      const tarea = this.tareaForm.value;
      this.store.dispatch(agregarTarea({ tarea }));
      this.tareaForm.reset();
    const modalElement = document.getElementById('crearTareaModal');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.hide();
    }
    }
  }
}
