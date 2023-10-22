import { envVars } from "@utils/environment";
import { meetupsIndex } from "../elastic";

export async function fixMeetupsMapping() {
  const response = await fetch(
    `http://elasticsearch:${envVars.ELASTIC_PORT}/${meetupsIndex}/_mapping`,
    {
      method: "PUT",
      body: JSON.stringify({
        properties: {
          name: {
            type: "text",
            fielddata: true,
          },
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
