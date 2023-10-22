import { BadRequestError } from "@utils/errors";
import { getScriptForGeoFilter } from "./getScriptForGeoFilter";
import { ElasticOptions, ElasticQuery } from "../interfaces";

export function formPaginationOptions(queryObject: Record<string, string>) {
  const { offset, limit, sort, order, time, longtitude, latitude, tags, name } =
    queryObject;

  if ((longtitude && !latitude) || (latitude && !longtitude))
    throw BadRequestError("Both latitude and longtitude required");

  const query: ElasticQuery = {
    bool: {},
  };

  let paginationOptions: ElasticOptions = {
    from: +offset,
    size: +limit,
  };

  let queryHasParamsForSearch = false;

  if (sort) {
    paginationOptions.sort = [];
    let sortOpts: { [k: string]: any } = {};
    sortOpts[sort] = {
      order: order || "asc",
    };

    paginationOptions.sort.push({ ...sortOpts });
  }

  if (latitude) {
    queryHasParamsForSearch = true;
    query.bool.filter = [];
    query.bool.filter.push({
      script: {
        script: getScriptForGeoFilter(longtitude, latitude),
      },
    });
  }

  if (time) {
    queryHasParamsForSearch = true;

    if (!query.bool.must)
      query.bool.must = {
        match: {
          time: new Date(time).toISOString(),
        },
      };
    else query.bool.must.match = { time: new Date(time).toISOString() };
  }

  if (name) {
    queryHasParamsForSearch = true;

    if (!query.bool.must)
      query.bool.must = {
        match: {
          name,
        },
      };
    else if (!query.bool.must.match) query.bool.must.match = { name };
    else query.bool.must.match.name = name;
  }

  if (tags) {
    queryHasParamsForSearch = true;
    if (!query.bool.filter) query.bool.filter = [];

    tags.split(",").forEach((item) => {
      const term = {
        tags: item,
      };
      query.bool.filter.push({ term });
    });
  }

  if (queryHasParamsForSearch) paginationOptions.query = query;
  return paginationOptions;
}
