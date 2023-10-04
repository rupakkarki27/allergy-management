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

export interface IApiErrorResponse {
  message?: string;
  statusCode?: number;
  error?: string;
}
