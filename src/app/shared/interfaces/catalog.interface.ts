export interface CatalogMeta {
  results_count: number;
  has_more: boolean;
  next: string | null;
}

export interface CatalogResponse<T> {
  data: T[];
  meta: CatalogMeta;
}
