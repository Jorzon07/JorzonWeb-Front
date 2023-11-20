import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { NoticiaService } from '../../../services/noticia/noticia.service';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css',
})
export class NoticiasComponent implements OnInit {
  noticias: any[] = [];

  constructor(
    private noticiasService: NoticiaService,
    public translateService: TranslateService
  ) {
    console.log('eval2', translateService.defaultLang)
  }

  listarNoticias() {
    this.noticiasService.listarNoticias().subscribe((response: any) => {
      this.noticias = response;
    });
  }

  ngOnInit(): void {
    this.listarNoticias();
  }
}
