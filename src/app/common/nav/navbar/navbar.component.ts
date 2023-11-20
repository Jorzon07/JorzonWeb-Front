import { Component } from '@angular/core';
import { LocaleService } from '../../../services/locale/locale.service';
import { ScrollService } from '../../../services/scroll.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  idioma: string = '';

  constructor(
    private localeService: LocaleService,
    private scrollService: ScrollService,
    private translateService: TranslateService
  ) {
    this.idioma = localeService.getIdioma();
  }

  setIdioma(locale: string) {
    this.localeService.setLocale(locale);
    this.idioma = this.localeService.getIdioma();
    window.location.reload();
  }

  scrollToId(id: string) {
    this.scrollService.scrollToElementById(id);
  }
}
