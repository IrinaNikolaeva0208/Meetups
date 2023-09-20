export interface PaginationQueryParams {
  offset: number;
  limit: number;
  sort?: "place" | "time" | "name";
  order?: "asc" | "desc";
  time?: string;
  place?: string;
  tags?: string;
  search?: string;
}
