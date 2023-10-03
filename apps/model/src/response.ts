export interface IPaginationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface IApiPaginationResponse<T> {
  items: T[];
  meta: IPaginationMeta;
}
