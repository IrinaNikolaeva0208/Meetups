import { BadRequestError } from "@utils/errors";
import { writeFile, mkdir } from "fs";
import { logger } from "@utils/logger";
import { envVars } from "@utils/environment";
import { PDFDocument, rgb } from "pdf-lib";

mkdir("./reports", (err) => {
  if (err) logger.error(err);
  else logger.info("Reports directory successfully created");
});

export class ReportsService {
  private postUrl: string;
  private template: string;

  async generateCsvList(url: string) {
    if (!url && !this.postUrl)
      throw BadRequestError("Provide url for meetups reporting");

    if (url) this.postUrl = url;

    const postResponse = await fetch(this.postUrl, {
      method: "POST",
      headers: {
        "kbn-xsrf": "true",
      },
    });

    const { path } = await postResponse.json();
    if (!path) throw BadRequestError("Incorrect url");

    let csvText = "pending";
    while (["pending", "processing"].includes(csvText)) {
      const getResponse = await fetch(
        "http://kibana:" + envVars.KIBANA_PORT + path
      );
      csvText = await getResponse.text();
    }

    console.log(csvText);

    writeFile(`./reports/${Date.now()}-list.csv`, csvText, "utf8", (err) => {
      if (err) throw err;
      else logger.info("Meetups list (csv) successfully created");
    });
  }

  async generatePdfTemplate(url: string) {
    if (this.template)
      writeFile(
        `./reports/${Date.now()}-template.pdf`,
        this.template,
        "utf8",
        (err) => {
          if (err) throw err;
          else logger.info("Meetups list template (pdf) successfully created");
        }
      );
    else {
      if (!url && !this.postUrl)
        throw BadRequestError("Provide url for meetups reporting");

      if (url) this.postUrl = url;

      const postResponse = await fetch(this.postUrl, {
        method: "POST",
        headers: {
          "kbn-xsrf": "true",
        },
      });

      const { path } = await postResponse.json();
      if (!path) throw BadRequestError("Incorrect url");

      let pdfText = "pending";
      while (["pending", "processing"].includes(pdfText)) {
        const getResponse = await fetch(
          "http://kibana:" + envVars.KIBANA_PORT + path
        );
        pdfText = await getResponse.text();
      }

      if (!this.template) this.template = pdfText;

      console.log(pdfText);

      const pdfDoc = await PDFDocument.create();

      const page = pdfDoc.addPage();

      const height = page.getHeight();

      const fontSize = 14;
      page.drawText(pdfText, {
        x: 50,
        y: height - 4 * fontSize,
        size: fontSize,
        color: rgb(0, 0, 0),
      });

      const pdfBytes = await pdfDoc.save();

      writeFile(
        `./reports/${Date.now()}-template.pdf`,
        pdfBytes,
        "utf8",
        (err) => {
          if (err) throw err;
          else logger.info("Meetups list template (pdf) successfully created");
        }
      );
    }
  }
}

export default new ReportsService();
