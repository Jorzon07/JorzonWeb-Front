import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  private locale: any = null;

  constructor(private translateService:TranslateService) {}

  setLocale(locale: string) {
    localStorage.setItem('locale', locale);
    this.locale = locale;
  }

  getLocale() {
    return localStorage.getItem('locale');
  }

  async getIdioma() {
    let locale = this.getLocale();
    let idioma = '';
    switch (locale) {
      case 'es-CO':
        
      idioma = await firstValueFrom(this.translateService.get('IDIOMA_ES'));

        break;

      case 'en-US':

      idioma = await firstValueFrom(this.translateService.get('IDIOMA_EN'));

      break;

        
      case 'fr-FR':

      idioma = await firstValueFrom(this.translateService.get('IDIOMA_FR'));

      break;

    }

    return idioma;
  }
}
