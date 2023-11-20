import { Component, LOCALE_ID, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocaleService } from './services/locale/locale.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'noticias-app';

  constructor(
    private translateService: TranslateService,
    private localeService: LocaleService,
    @Inject(LOCALE_ID) public locale: string
  ) {
    console.log('eval', localeService.getLocale() || locale)
    translateService.setDefaultLang(localeService.getLocale() || locale);
  }
}
