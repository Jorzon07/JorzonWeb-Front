import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';
declare var window: any;

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css',
})
export class RegistrarComponent {
  public formGroup: FormGroup;
  errors: string[] = [];
  usuario: any;
  loadingRegistro: boolean = false;
  mensajeRespuesta : string;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.construirFormulario();
  }

  private construirFormulario() {
    this.formGroup = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['TIPO_USUARIO', Validators.required],
      llaveSecreta: [''],
    });
  }

  guardar() {
    this.checkErrores();
    if (this.formGroup.invalid) {
      return;
    }

    this.loadingRegistro = true;
    this.usuarioService.registrar(this.formGroup.getRawValue()).subscribe({
      next: (response : any) => {      
        this.loadingRegistro = false;
        this.resetForm();
        this.mensajeRespuesta = response.mensaje
        this.registroExitoso();
      },
      error: ({error}) => {
        this.loadingRegistro = false;
        this.errors.push(error?.errores == null ? error.mensaje : error?.errores);
      },
    });
  }

  checkErrores() {
    this.errors = [];
    if (this.formGroup.get('nombre')?.invalid) {
      this.errors.push('El nombre es obligatorio');
    }
    if (this.formGroup.get('correo')?.invalid) {
      this.errors.push(
        'El correo es obligatorio/Cumplir con el formato de correo'
      );
    }
    if (this.formGroup.get('password')?.invalid) {
      this.errors.push('La contraseña es obligatoria');
    }
    if (this.formGroup.get('confirmPassword')?.invalid) {
      this.errors.push('Debe confirmar la contraseña');
    }
    if (
      this.formGroup.get('password')?.valid &&
      this.formGroup.get('confirmPassword')?.valid
    ) {
      if (
        this.formGroup.get('password')?.value !=
        this.formGroup.get('confirmPassword')?.value
      ) {
        this.errors.push('Las contraseñas no coinciden');
      }
    }
    if (
      this.formGroup.get('role')?.valid &&
      this.formGroup.get('role')?.value == 'TIPO_USUARIO'
    ) {
      this.errors.push('Debe seleccionar un Rol');
    }
  }

  registroExitoso() {
    let modal = new window.bootstrap.Modal(
      document.getElementById('modalRegistroExitoso')
    );
    modal.show();
  }

  irALogin() {
    window.location.href="/login"

  }

  resetForm(){
    this.formGroup.reset();
    this.formGroup.get('role')?.setValue('TIPO_USUARIO');
  }
}
