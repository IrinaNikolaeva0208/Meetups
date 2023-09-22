import swaggerAutogen from "swagger-autogen";

const outputFile = "../../docs/api.yml";
const endpointsFiles = ["../app.ts"];
const config = {
  securityDefinitions: {
    bearer: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
};

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, config);
