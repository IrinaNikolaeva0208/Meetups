import { Client } from "@elastic/elasticsearch";
import { envVars } from "@utils/environment";

const elasticUrl = `http://elasticsearch:${envVars.ELASTIC_PORT}`;
export const esclient = new Client({ node: elasticUrl });
export const meetupsIndex = "meetups-index";
