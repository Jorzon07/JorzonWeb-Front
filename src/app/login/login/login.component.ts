import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { CheckPermissionsDirective } from '../../directives/checkpermissions.directive';
declare var window: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers : [CheckPermissionsDirective]
})
export class LoginComponent {
  loadIngresando: boolean;
  errors: string[] = [];
  mensajeRespuesta: string;

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {
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
    if (this.errors.length > 0) {
      return;
    }
    this.loadIngresando = true;
    this.loginService.iniciar(this.formGroup.getRawValue()).subscribe({
      next: (value : any) => {
        this.loginService.setSession(value.datos);
        this.loadIngresando = false;
        //window.location.href = '/home';
      },
      error: (error: any) => {
        console.log(error);
        this.loadIngresando = false;
        this.mensajeRespuesta = error?.error?.mensaje || error.message;
        this.errorLogin();
      },
    });
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

  errorLogin() {
    let modal = new window.bootstrap.Modal(
      document.getElementById('modalError')
    );
    modal.show();
  }
}
