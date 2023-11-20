import { Component } from '@angular/core';
import { LocaleService } from '../../../services/locale/locale.service';
import { ScrollService } from '../../../services/scroll.service';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from '../../../services/login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  idioma: string = '';
  usuario : string;

  autenticado : boolean = false;

  constructor(
    private localeService: LocaleService,
    private scrollService: ScrollService,
    private translateService: TranslateService,
    public loginService : LoginService
  ) {

    this.autenticado = loginService.estaAutenticado();
    this.usuario = loginService.getSession()?.nombre;
    localeService.getIdioma().then(value =>{
      this.idioma = value;
    });
  }

  salir(){
    this.loginService.cerrarSession();
    window.location.href = "/home"
  }

  async setIdioma(locale: string) {
    this.localeService.setLocale(locale);
    this.idioma = await this.localeService.getIdioma();
    window.location.reload();
  }

  scrollToId(id: string) {
    this.scrollService.scrollToElementById(id);
  }
}
