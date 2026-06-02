import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  private readonly baseUrl = '/api/v1/music';

  getArtistUrl(id: string): string {
    return `${this.baseUrl}/artists/${id}`;
  }

  getTracksUrl(id: string): string {
    return `${this.getArtistUrl(id)}/tracks`;
  }

  getAlbumsUrl(id: string): string {
    return `${this.getArtistUrl(id)}/albums`;
  }
}
