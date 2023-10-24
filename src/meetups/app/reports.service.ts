import { BadRequestError } from "@utils/errors";
import { writeFile, mkdir } from "fs";
import { logger } from "@utils/logger";
import { envVars } from "@utils/environment";
import { PDFDocument, rgb, PageSizes } from "pdf-lib";

mkdir("./reports", (err) => {
  if (err) logger.error(err);
  else logger.info("Reports directory successfully created");
});

export class ReportsService {
  private postUrl: string;
  private template: string;

  async generateCsvList(url: string) {
    const csvText = await this.requestMeetups(url);
    this.createReportFile(csvText, "list.csv");
  }

  async generatePdfTemplate(url: string) {
    if (this.template) await this.createPdf(this.template);
    else {
      const pdfText = await this.requestMeetups(url);
      await this.createPdf(pdfText);
    }
  }

  async requestMeetups(url: string) {
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

    let responseText = "pending";
    while (["pending", "processing"].includes(responseText)) {
      const getResponse = await fetch(
        "http://kibana:" + envVars.KIBANA_PORT + path
      );
      responseText = await getResponse.text();
    }
    if (!this.template) this.template = responseText;
    return responseText;
  }

  async createPdf(pdfText: string) {
    const pdfDoc = await PDFDocument.create();

    const page = pdfDoc.addPage([1200, 700]);

    const height = page.getHeight();

    const fontSize = 9;
    page.drawText(pdfText, {
      x: 50,
      y: height - 4 * fontSize,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();

    this.createReportFile(pdfBytes, "template.pdf");
  }

  createReportFile(content: string | Uint8Array, fileType: string) {
    writeFile(`./reports/${Date.now()}-${fileType}`, content, "utf8", (err) => {
      if (err) throw err;
      else logger.info(`Meetups ${fileType} successfully created`);
    });
  }
}

export default new ReportsService();
