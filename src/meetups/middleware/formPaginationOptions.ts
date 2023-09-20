import { paginationOptions } from "../interfaces/paginationOptions";
import { PaginationQueryParams } from "../interfaces/paginationQueryParams";

export function formPaginationOptions(queryObject: Record<string, string>) {
  const { offset, limit, sort, order, time, place, tags, search } = queryObject;

  const paginationOptions: paginationOptions = {
    skip: +offset,
    take: +limit,
    orderBy: {},
    where: {},
  };
  if (sort) paginationOptions.orderBy[sort] = order || "asc";

  if (time)
    paginationOptions.where.time = new Date(time as string).toISOString();
  if (place) paginationOptions.where.place = place;
  if (tags)
    paginationOptions.where.tags = {
      hasEvery: (tags as string).split(","),
    };

  if (search) paginationOptions.where["name"] = { contains: search };

  return paginationOptions;
}
