import { Album } from "@shared/interfaces/album.interface";
import { Artist } from "@shared/interfaces/artist.interface";

type AlbumCard = Album & { type: 'album' };
type ArtistCard = Artist & { type: 'artist' };

export type CatalogData = AlbumCard | ArtistCard;