import { PaginationFilter } from "./paginationFilter";

export interface paginationOptions extends PaginationFilter {
  skip: number;
  take: number;
  orderBy: {
    name?: "asc" | "desc";
    time?: "asc" | "desc";
    place?: "asc" | "desc";
  };
}
