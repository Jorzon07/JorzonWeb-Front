import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loadIngresando: boolean;
  errors: string[] = [];

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.construirFormulario();
  }

  construirFormulario() {
    this.formGroup = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    this.checkErrores();
  }

  checkErrores() {
    this.errors = [];

    if (this.formGroup.get('correo')?.invalid) {
      this.errors.push(
        'El correo es obligatorio/Cumplir con el formato de correo'
      );
    }
    if (this.formGroup.get('password')?.invalid) {
      this.errors.push('La contraseña es obligatoria');
    }
  }
}
