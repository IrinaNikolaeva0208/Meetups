import { BadRequestError } from "@utils/errors";

export function formPaginationOptions(queryObject: Record<string, string>) {
  const { sort, order, time, longtitude, latitude, tags, search } = queryObject;

  if ((longtitude && !latitude) || (latitude && !longtitude))
    throw BadRequestError("Both latitude and longtitude required");

  const filter = [];

  if (time || tags || search || latitude) {
    if (time) filter.push(`time = '${time}'`);
    if (search) filter.push(`name LIKE '${search}%'`);
    if (tags) {
      const tagsForRequest = tags
        .split(",")
        .map((item) => `'${item}'`)
        .join(",");
      filter.push(`ARRAY[${tagsForRequest}] <@ tags`);
    }
    if (latitude)
      filter.push(`longtitude = ${longtitude} AND latitude = ${latitude}`);
  }

  let paginationOptions = {
    filter: filter.length ? "WHERE " + filter.join(" AND ") : "",
    sort: sort ? `ORDER BY ${sort} ${order || "ASC"}` : "",
  };

  console.log(paginationOptions);

  return paginationOptions;
}
