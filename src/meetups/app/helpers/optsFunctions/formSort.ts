import { ElasticOptions } from "../../interfaces";

export function formSort(options: ElasticOptions, sort: string, order: string) {
  options.sort = [];
  let sortOpts: { [k: string]: any } = {};
  sortOpts[sort] = {
    order,
  };

  options.sort.push({ ...sortOpts });
}
