import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  private locale: any = null;

  constructor() {}

  setLocale(locale: string) {
    localStorage.setItem('locale', locale);
    this.locale = locale;
  }

  getLocale() {
    return localStorage.getItem('locale');
  }

  getIdioma() {
    let locale = this.getLocale();
    let idioma = '';
    switch (locale) {
      case 'es-CO':
        idioma = 'Español';
        break;
      case 'en-US':
        idioma = 'Inglés';
        break;
      case 'fr-FR':
        idioma = 'Francés';
        break;
    }

    return idioma;
  }
}
