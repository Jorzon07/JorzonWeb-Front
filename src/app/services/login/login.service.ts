import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { LocaleService } from '../locale/locale.service';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  API = environment.host + '/api/login';

  constructor(
    private httpClient: HttpClient,
    @Inject(LOCALE_ID) public locale: string,
    private localeService: LocaleService,
    public jwtHelper: JwtHelperService
  ) {}

  iniciar(loginRequest: any) {
    let currentLocale = this.localeService.getLocale();
    return this.httpClient.post(this.API, loginRequest, {
      headers: {
        'Accept-language': currentLocale == null ? this.locale : currentLocale,
      },
    });
  }

  setSession(respuestaLogin: any) {
    localStorage.setItem('session', JSON.stringify(respuestaLogin));
    localStorage.setItem('token', respuestaLogin.token);
  }

  getSession() {
    return JSON.parse(localStorage.getItem('session') || '{}');
  }

  cerrarSession() {
    localStorage.removeItem('session');
    localStorage.removeItem('token');
  }

  estaAutenticado() {
    const token = localStorage.getItem('token');
    try {
      return !this.jwtHelper.isTokenExpired(token);
    } catch (error) {
      return false;
    }
  }
}
