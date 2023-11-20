import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LocaleService } from '../locale/locale.service';

@Injectable({
  providedIn: 'root',
})
export class NoticiaService {
  API = environment.host + '/api/public/noticia';

  constructor(
    private client: HttpClient,
    @Inject(LOCALE_ID) public locale: string,
    private localeService : LocaleService
  ) {}

  listarNoticias() {
    
    let currentLocale = this.localeService.getLocale();
    return this.client.get(this.API, {
      headers: { 'Accept-language': currentLocale == null ? this.locale : currentLocale },
    });
  }

  listarPopulares() {
    let currentLocale = this.localeService.getLocale();
    return this.client.get(this.API+"/popular", {
      headers: { 'Accept-language': currentLocale == null ? this.locale : currentLocale },
    });
  }

  obtenerNoticia(id : number) {
    let currentLocale = this.localeService.getLocale();
    return this.client.get(this.API+"/"+id, {
      headers: { 'Accept-language': currentLocale == null ? this.locale : currentLocale },
    });
  }
}
