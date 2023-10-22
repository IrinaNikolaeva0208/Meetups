import { BadRequestError } from "@utils/errors";
import { ElasticOptions, ElasticQuery } from "../interfaces";
import {
  formTags,
  formContains,
  formGeo,
  formName,
  formSort,
  formTime,
} from "./optsFunctions";
import { fixMeetupsMapping } from "./fixMeetupMappings";

let fixedMappings = false;

export async function formPaginationOptions(
  queryObject: Record<string, string>
) {
  const {
    offset,
    limit,
    sort,
    order,
    time,
    longtitude,
    latitude,
    tags,
    name,
    contains,
  } = queryObject;

  let paginationOptions: ElasticOptions = {
    from: +offset,
    size: +limit,
  };

  if (contains) {
    formContains(paginationOptions, contains);
  } else {
    if ((longtitude && !latitude) || (latitude && !longtitude))
      throw BadRequestError("Both latitude and longtitude required");

    let queryHasParamsForSearch = false;
    const query: ElasticQuery = {
      bool: {},
    };

    if (sort) {
      if (!fixedMappings) {
        await fixMeetupsMapping();
        fixedMappings = true;
      }
      formSort(paginationOptions, sort, order || "asc");
    }

    if (latitude) {
      queryHasParamsForSearch = true;
      formGeo(query, latitude, longtitude);
    }

    if (time) {
      queryHasParamsForSearch = true;
      formTime(query, time);
    }

    if (name) {
      queryHasParamsForSearch = true;
      formName(query, name);
    }

    if (tags) {
      queryHasParamsForSearch = true;
      formTags(query, tags);
    }

    if (queryHasParamsForSearch) paginationOptions.query = query;
  }

  return paginationOptions;
}
