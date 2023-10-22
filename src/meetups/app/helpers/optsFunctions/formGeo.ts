import { ElasticQuery } from "../../interfaces";
import { getScriptForGeoFilter } from "./getScriptForGeoFilter";

export function formGeo(
  query: ElasticQuery,
  latitude: string,
  longtitude: string
) {
  query.bool.filter = [];
  query.bool.filter.push({
    script: {
      script: getScriptForGeoFilter(longtitude, latitude),
    },
  });
}
