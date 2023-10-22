import { esclient, meetupsIndex as index } from "./elastic";

class MeetupsIndex {
  async findMany(options: any) {
    return (
      await esclient.search({
        index,
        ...options,
      })
    ).hits.hits.map((item) => item._source);
  }

  async getNumberOfFiltered(filter: any) {
    return (
      await esclient.count({
        index,
        ...filter,
      })
    ).count;
  }
}

export default new MeetupsIndex();
