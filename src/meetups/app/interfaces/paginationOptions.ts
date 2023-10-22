import { ElasticQuery } from "./elasticQuery";

export interface ElasticOptions {
  from: number;
  size: number;
  sort?: any[];
  query?: ElasticQuery;
}
