import { AfterViewInit, Component } from '@angular/core';
import { NoticiaService } from '../../../services/noticia/noticia.service';
import {  GalleryItem, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrl: './popular.component.css',
})
export class PopularComponent implements AfterViewInit {
  populares: any[] = [];
  imagenes: GalleryItem[] = [];

  constructor(private noticiasSercice: NoticiaService) {
    this.listarPopulares();
  }

  listarPopulares() {
    this.noticiasSercice.listarPopulares().subscribe((response: any) => {
      this.populares = response;      
    });
  }

  ngAfterViewInit() {}
}
