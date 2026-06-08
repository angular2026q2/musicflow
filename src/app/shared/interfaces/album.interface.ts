export interface Album {
  id: string;
  name: string;
  releasedate: string;
  artist_id: string;
  artist_name: string;
  image: string;
  zip: string;
  shorturl: string;
  shareurl: string;
  zip_allowed: boolean;
  // todo: tracks: Track[]; - добавить, когда до этого дойдёт дело
}
