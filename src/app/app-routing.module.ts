import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarComponent } from './registrar/registrar/registrar.component';
import { HomeComponent } from './home/home/home.component';
import { NoticiaComponent } from './noticia/noticia/noticia.component';
import { LoginComponent } from './login/login/login.component';

const routes: Routes = [
  { path: 'registrar', component: RegistrarComponent },
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'noticia/:id', component: NoticiaComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
