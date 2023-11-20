import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarComponent } from './registrar/registrar/registrar.component';
import { HomeComponent } from './home/home/home.component';
import { NoticiaComponent } from './noticia/noticia/noticia.component';
import { LoginComponent } from './login/login/login.component';
import { UsuariosComponent } from './admin/usuarios/usuarios/usuarios.component';
import { AuthGuardService } from './services/auth/authguard.service';
import { NoLoginGuardService } from './services/auth/nologin.service';

const routes: Routes = [
  {
    path: 'registrar',
    component: RegistrarComponent,
    canActivate: [NoLoginGuardService],
  },
  { path: 'home', component: HomeComponent },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoLoginGuardService],
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'noticia/:id', component: NoticiaComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
  providers : []
})
export class AppRoutingModule {}
