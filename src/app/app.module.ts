import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrarComponent } from './registrar/registrar/registrar.component';
import { LoginComponent } from './login/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home/home.component';
import { NavbarComponent } from './common/nav/navbar/navbar.component';
import { PopularComponent } from './common/popular/popular/popular.component';
import { NoticiasComponent } from './common/noticias/noticias/noticias.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoticiaComponent } from './noticia/noticia/noticia.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import localeFr from '@angular/common/locales/fr';
import localeEs from '@angular/common/locales/es';
import localeEn from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { JwtModule } from '@auth0/angular-jwt';
import { CheckPermissionsDirective } from './directives/checkpermissions.directive';
import { UsuariosComponent } from './admin/usuarios/usuarios/usuarios.component';
import { ContactoComponent } from './common/contacto/contacto/contacto.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    RegistrarComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    PopularComponent,
    NoticiasComponent,
    NoticiaComponent,
    CheckPermissionsDirective,
    UsuariosComponent,
    ContactoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["*"]
      },
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    
  ],
  providers: [CheckPermissionsDirective],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    registerLocaleData(localeFr, 'fr');
    registerLocaleData(localeEs, 'es');
    registerLocaleData(localeEn, 'en');
  }
}
