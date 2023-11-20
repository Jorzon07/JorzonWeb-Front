import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoticiaService } from '../../services/noticia/noticia.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrl: './noticia.component.css',
})
export class NoticiaComponent implements OnInit, OnDestroy {
  id: number = 0;
  private sub: any;
  noticia: any = {};

  constructor(
    private route: ActivatedRoute,
    private noticiaService: NoticiaService,
    public translateService : TranslateService
  ) {
    this.noticia = {};
  }

  obtenerNoticia() {
    this.noticiaService.obtenerNoticia(this.id).subscribe((noticia: any) => {
      this.noticia = noticia;
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.obtenerNoticia();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
