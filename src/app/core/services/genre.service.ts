import { Injectable } from '@angular/core';
import { Genre } from '@shared/types/genre.type';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  getGenres() {
    return of<Genre[]>([
      Genre.Rock,
      Genre.Electronic,
      Genre.Classical,
      Genre.AmbientNewAge,
      Genre.Filmscore,
      Genre.Advertising,
      Genre.Pop,
      Genre.Corporate,
      Genre.Alternative,
    ]);
  }
}
