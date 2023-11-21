import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LocaleService } from '../locale/locale.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  API = environment.host + '/api/usuario';

  constructor(
    private httpClient: HttpClient,
    @Inject(LOCALE_ID) public locale: string,
    private localeService: LocaleService
  ) {}

  registrar(usuario: any) {
    let currentLocale = this.localeService.getLocale();
    return this.httpClient.post(this.API + '/registro', usuario, {
      headers: {
        'Accept-language': currentLocale == null ? this.locale : currentLocale,
      },
    });
  }

  listado() {
    let currentLocale = this.localeService.getLocale();
    return this.httpClient.get(this.API, {
      headers: {
        'Accept-language': currentLocale == null ? this.locale : currentLocale,
      },
    });
  }
}
