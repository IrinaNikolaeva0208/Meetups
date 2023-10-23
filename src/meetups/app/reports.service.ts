import { BadRequestError } from "@utils/errors";
import { writeFile, mkdir } from "fs";
import { logger } from "@utils/logger";
import { envVars } from "@utils/environment";

mkdir("./reports", (err) => {
  if (err) logger.error(err);
  else logger.info("Reports directory successfully created");
});

export class ReportsService {
  private postCsvUrl: string;

  async generateCsvList(url: string) {
    if (!url && !this.postCsvUrl)
      throw BadRequestError("Provide url for meetups list reporting");

    if (url) this.postCsvUrl = url;

    const postResponse = await fetch(this.postCsvUrl, {
      method: "POST",
      headers: {
        "kbn-xsrf": "true",
      },
    });

    const { path } = await postResponse.json();
    if (!path) throw BadRequestError("Incorrect url");

    setTimeout(async () => {
      const getResponse = await fetch(
        "http://kibana:" + envVars.KIBANA_PORT + path
      );
      const csvText = await getResponse.text();

      writeFile(`./reports/${Date.now()}.csv`, csvText, "utf8", (err) => {
        if (err) throw err;
        else logger.info("Meetups list (csv) successfully created");
      });
    }, 5000);
  }
}

export default new ReportsService();
